import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { getDb, saveDb, initDb } from "./src/db.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const app = express();
const PORT = 3000;

// Middleware to parse large JSON bodies for images (if needed)
app.use(express.json({ limit: '50mb' }));

// Database initialization promise state
let dbInitialized = false;
let dbInitializingPromise: Promise<void> | null = null;

async function ensureDb() {
  if (dbInitialized) return;
  if (!dbInitializingPromise) {
    dbInitializingPromise = initDb().then(() => {
      dbInitialized = true;
    });
  }
  await dbInitializingPromise;
}

// Middleware to guarantee DB is initialized before any request is served
app.use(async (req, res, next) => {
  try {
    await ensureDb();
    next();
  } catch (err) {
    console.error("Failed to initialize database for request:", err);
    next(err);
  }
});

// Simple token-based auth for dashboard
const MOCK_TOKEN = "hotel-prayagraj-admin-token-7x9z";

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME || "admin";
  const adminPass = process.env.ADMIN_PASSWORD || "secret";
  
  if (username === adminUser && password === adminPass) {
    res.json({ success: true, token: MOCK_TOKEN });
  } else {
    res.status(401).json({ success: false, error: "Invalid credentials" });
  }
});

app.post("/api/verify", (req, res) => {
  const { token } = req.body;
  if (token === MOCK_TOKEN) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// Authentication Middleware for API routes
const requireAuth = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1] || req.body.token;
  if (token === MOCK_TOKEN) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Generic CRUD for collections
const collections = ['rooms', 'bookings', 'gallery', 'attractions'];

collections.forEach(col => {
  // GET all
  app.get(`/api/${col}`, (req, res) => {
    const db = getDb();
    res.json(db[col] || []);
  });
  
  // POST create (exclude bookings from requireAuth)
  if (col !== 'bookings') {
    app.post(`/api/${col}`, requireAuth, (req, res) => {
      const db = getDb();
      const newItem = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...req.body };
      if (!db[col]) db[col] = [];
      db[col].push(newItem);
      saveDb();
      res.json(newItem);
    });
  }
  
  // PUT update
  app.put(`/api/${col}/:id`, requireAuth, (req, res) => {
    const db = getDb();
    const index = db[col].findIndex((item: any) => item.id === req.params.id);
    if (index >= 0) {
      db[col][index] = { ...db[col][index], ...req.body, updatedAt: new Date().toISOString() };
      saveDb();
      res.json(db[col][index]);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });
  
  // DELETE
  app.delete(`/api/${col}/:id`, requireAuth, (req, res) => {
    const db = getDb();
    const index = db[col].findIndex((item: any) => item.id === req.params.id);
    if (index >= 0) {
      db[col].splice(index, 1);
      saveDb();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });
});

// Settings & Content (Singletons)
['settings', 'content'].forEach(col => {
  app.get(`/api/${col}`, (req, res) => {
    const db = getDb();
    res.json(db[col] || {});
  });
  
  app.put(`/api/${col}`, requireAuth, (req, res) => {
    const db = getDb();
    db[col] = { ...db[col], ...req.body };
    saveDb();
    res.json(db[col]);
  });
});

// Conversations
app.get("/api/conversations", requireAuth, (req, res) => {
  res.json(getDb().conversations || []);
});

// AI chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const db = getDb();
    const settings = db.settings;
    
    if (!settings.chatbotEnabled) {
      return res.json({ text: "I'm sorry, the chat assistant is currently disabled." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
    }

    const ai = new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' }
      }
    });

    // Format messages history
    const contents = messages.map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Start abort controller to handle timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: settings.chatbotPrompt || "You are a helpful hotel assistant.",
        temperature: 0.7,
      }
    });
    
    clearTimeout(timeoutId);

    // Save conversation history
    if (!db.conversations) db.conversations = [];
    db.conversations.push({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      messages: [...messages, { sender: 'bot', text: response.text }]
    });
    saveDb();

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to process chat message" });
  }
});

// Razorpay logic
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mock_secret',
});

app.post("/api/create-order", async (req, res) => {
  try {
    const { bookingDetails, paymentMethod } = req.body;
    
    // Calculate total based on room in DB to ensure security
    const db = getDb();
    const room = db.rooms.find((r: any) => r.id === bookingDetails.roomId);
    
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Calculate days
    const start = new Date(bookingDetails.checkIn);
    const end = new Date(bookingDetails.checkOut);
    let days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    if (isNaN(days) || days <= 0) days = 1;
    
    const subtotal = room.price * days;
    const taxes = subtotal * 0.18; // 18% GST
    const total = subtotal + taxes;
    
    // Save as draft booking
    const bookingId = "BKG-" + Date.now();
    const newBooking = {
      ...bookingDetails,
      id: bookingId,
      roomName: room.name,
      subtotal,
      taxes,
      totalPrice: total,
      status: paymentMethod === 'pay_at_hotel' ? 'completed' : 'pending_payment',
      paymentMethod: paymentMethod === 'pay_at_hotel' ? 'Pay at Hotel' : undefined,
      createdAt: new Date().toISOString()
    };
    
    if (!db.bookings) db.bookings = [];
    db.bookings.push(newBooking);

    if (paymentMethod === 'pay_at_hotel') {
      db.rooms = db.rooms.map((r: any) => 
        r.id === room.id ? { ...r, available: false } : r
      );
      saveDb();

      // Mock sending confirmation Email and WhatsApp
      console.log(`[Email] Sending booking confirmation to ${newBooking.guestEmail}`);
      console.log(`[WhatsApp] Sending booking confirmation to ${newBooking.guestPhone}`);

      return res.json({
        success: true,
        isPayAtHotel: true,
        booking: newBooking
      });
    }

    saveDb();

    // Mock Razorpay order creation in test mode without valid keys
    if (process.env.RAZORPAY_KEY_ID) {
      const options = {
        amount: Math.round(total * 100), // amount in smallest currency unit
        currency: "INR",
        receipt: bookingId,
      };
      
      const order = await razorpay.orders.create(options);
      res.json({
        success: true,
        orderId: order.id,
        bookingId: bookingId,
        amount: options.amount,
        currency: options.currency,
        key: process.env.RAZORPAY_KEY_ID,
        booking: newBooking
      });
    } else {
      // Mock order if no API keys
      res.json({
        success: true,
        orderId: "order_mock_" + Date.now(),
        bookingId: bookingId,
        amount: Math.round(total * 100),
        currency: "INR",
        key: "rzp_test_mock_key",
        booking: newBooking,
        isMock: true // Instruct frontend to bypass actual razorpay popup if true
      });
    }
  } catch (error: any) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "Failed to create payment order" });
  }
});

app.post("/api/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId, isMock } = req.body;
    
    const db = getDb();
    const bookingIndex = db.bookings.findIndex((b: any) => b.id === bookingId);
    
    if (bookingIndex === -1) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (!isMock) {
      const secret = process.env.RAZORPAY_KEY_SECRET || '';
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body.toString())
        .digest("hex");
        
      if (expectedSignature !== razorpay_signature) {
         db.bookings[bookingIndex].status = 'failed';
         saveDb();
         return res.status(400).json({ error: "Invalid signature" });
      }
    }

    // Mark as paid
    db.bookings[bookingIndex].status = 'completed';
    db.bookings[bookingIndex].paymentId = razorpay_payment_id || 'mock_payment_id';
    db.bookings[bookingIndex].paymentMethod = 'UPI'; // Assuming UPI for this task
    saveDb();
    
    // Update room availability
    db.rooms = db.rooms.map((r: any) => 
       r.id === db.bookings[bookingIndex].roomId ? { ...r, available: false } : r
    );
    saveDb();

    // Mock sending confirmation Email and WhatsApp
    console.log(`[Email] Sending booking confirmation to ${db.bookings[bookingIndex].guestEmail}`);
    console.log(`[WhatsApp] Sending booking confirmation to ${db.bookings[bookingIndex].guestPhone}`);

    res.json({ success: true, booking: db.bookings[bookingIndex] });
  } catch (error: any) {
    console.error("Verify payment error:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
});

// Dashboard Overview Analytics
app.get("/api/analytics", requireAuth, (req, res) => {
  const db = getDb();
  const rooms = db.rooms || [];
  const bookings = db.bookings || [];
  
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter((r:any) => r.available).length;
  const occupiedRooms = totalRooms - availableRooms;
  
  const pendingBookings = bookings.filter((b:any) => b.status === 'pending_payment' || b.status === 'pending').length;
  const completedBookings = bookings.filter((b:any) => b.status === 'completed').length;
  
  // Revenue calculation
  const revenue = bookings
    .filter((b:any) => b.status === 'completed')
    .reduce((acc:number, b:any) => acc + (Number(b.totalPrice) || 0), 0);

  res.json({
    totalRooms,
    availableRooms,
    occupiedRooms,
    pendingBookings,
    completedBookings,
    revenue,
    recentGuests: bookings.slice(-5).reverse(),
    recentConversations: (db.conversations || []).slice(-5).reverse()
  });
});

async function startServer() {
  // Vite middleware / Static serving setup (not needed on Vercel platform because Vercel serves static natively)
  if (!process.env.VERCEL) {
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  }
}

startServer();

export default app;
