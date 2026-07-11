import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { getDb, saveDb } from "./src/db.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse large JSON bodies for images (if needed)
  app.use(express.json({ limit: '50mb' }));

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
    
    // POST create
    app.post(`/api/${col}`, requireAuth, (req, res) => {
      const db = getDb();
      const newItem = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...req.body };
      if (!db[col]) db[col] = [];
      db[col].push(newItem);
      saveDb();
      res.json(newItem);
    });
    
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
      const convId = messages[0].id || Date.now().toString(); // simplify
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

  // Dashboard Overview Analytics
  app.get("/api/analytics", requireAuth, (req, res) => {
    const db = getDb();
    const rooms = db.rooms || [];
    const bookings = db.bookings || [];
    
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter((r:any) => r.available).length;
    const occupiedRooms = totalRooms - availableRooms;
    
    const pendingBookings = bookings.filter((b:any) => b.status === 'pending').length;
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

  // Vite middleware for development
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

startServer();
