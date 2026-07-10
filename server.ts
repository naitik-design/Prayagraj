import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simple token-based auth for dashboard
  const MOCK_TOKEN = "hotel-prayagraj-admin-token-7x9z";

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "admin123";
    
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

  // AI chat route
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
      }

      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Format messages history for Gemini SDK
      const contents = messages.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const systemInstruction = `You are "Prayagraj Concierge", the official interactive luxury AI assistant of Hotel Prayagraj in Reengus, Rajasthan.
Your primary role is to assist guests in real-time, responding politely, warmly, and helpfully to inquiries regarding rooms, availability, amenities, and bookings.

Here are the official details of Hotel Prayagraj:
1. About & Location:
   - Vibe: Premium sanctuary blending modern comfort, flawless cleanliness, and traditional Rajasthani warmth (traditional hospitality).
   - Address: 2–3 Shree Shyam Vihar Colony, Khatu Shyamji Road, Near Shiva Temple, Reengus, Rajasthan 332404.
   - Proximity: Strategically located for pilgrims and travelers visiting the holy Khatu Shyam Ji Temple. Ideal, peaceful resting place.

2. Room Accommodations & Pricing:
   - Deluxe Room: A beautifully appointed room with a King Bed, premium bedding, elegant decor, fully air-conditioned, room service, daily housekeeping. Ideal for couples or solo travelers. Starts from ₹2,500 per night.
   - Family Room: Spacious accommodations designed for families and groups, featuring a King Bed + Queen Bed (or multiple beds), air conditioning, in-house dining access, daily housekeeping, room service, and free parking. Starts from ₹4,500 per night.

3. Premium Amenities:
   - Free Parking, Fully Air Conditioned, Daily Housekeeping, Room Service (24/7), Garden Area, Family Stay setups, In-house Dining (serving delicious pure vegetarian Indian and authentic Rajasthani food), Prime Location.

4. Booking & Availability Inquiries:
   - If a guest asks about room availability (e.g., "Do you have rooms available for next Monday?"), enthusiastically confirm that we have availability for Deluxe and Family rooms! Ask them for their target dates, number of guests, and room type to register an inquiry.
   - Offer to take down booking details: Full Name, Phone Number, Email, Room Type, Check-in/out dates, and number of guests.
   - Once they provide their booking preferences (e.g., name, phone, dates), reply with: "Thank you, [Name]! I have successfully registered your booking request for the [Room Type] from [Dates]. Our reservation desk will reach out to you shortly at [Phone] or [Email] to complete your stay. For instant booking confirmation, feel free to call us directly at +91 75971 17839!"

5. Contacts:
   - Phone Numbers for immediate booking/support: +91 75971 17839, +91 96940 56634, +91 99219 36383.
   - Email: info@prayagrajhotel.com

Guidelines for behavior:
- Always be polite, welcoming, and treat every guest with respect. Use a warm, premium hotel concierge tone. Greeting with "Namaste! Welcome to Hotel Prayagraj..." is highly encouraged.
- Keep responses concise, scannable, and elegant. Use bolding and lists when sharing amenities or prices.
- Never invent policies or fake information. If you cannot answer a specific question, advise them to call our friendly front desk at +91 75971 17839.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
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
