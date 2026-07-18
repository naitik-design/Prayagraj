export const knowledgeBase = [
  {
    category: "Check-in & Check-out",
    keywords: ["check in", "check-in", "checkout", "check-out", "checkin", "check out", "timing", "time", "kab", "aana hai", "jana hai", "samay", "baje"],
    answer: "Our standard check-in time is **12:00 PM**, and check-out time is **11:00 AM**. Early check-in or late check-out is subject to availability and may incur extra charges. For foreign guests, a Passport and Valid Visa are mandatory."
  },
  {
    category: "Rooms & Pricing",
    keywords: ["room", "price", "cost", "tariff", "deluxe", "suite", "family", "ac ", "ac", "non-ac", "balcony", "view", "bed", "size", "tv", "bathroom", "hot water", "kamra", "kamera", "kitna", "paisa", "rupee", "kiraya", "rent"],
    answer: "We offer two types of rooms:\n- **Deluxe Heritage Room**: ₹3,500/night (Couples, AC, Smart TV, Room Service, Free Wi-Fi).\n- **Royal Rajwada Suite**: ₹5,500/night (Family, capacity 4, AC, Mini Bar, Bathtub, Living Area, Free Wi-Fi).\nAll rooms have attached bathrooms with 24/7 hot and cold water. Extra bed is available for a fee."
  },
  {
    category: "Location & Directions",
    keywords: ["location", "address", "where", "direction", "map", "nearby", "landmark", "achrol", "highway", "petrol pump", "atm", "hospital", "kaha", "kahan", "kaise", "rasta", "pata", "kidhar"],
    answer: "We are located at: **Syari, Talamod, Delhi–Jaipur Road, NH-11C, Achrol, Rajasthan 303002**. We are on the Delhi-Jaipur highway, easily accessible by road. Nearby you can find ATMS, petrol pumps, and local shopping areas."
  },
  {
    category: "Contact & Booking",
    keywords: ["book", "booking", "contact", "phone", "whatsapp", "email", "website", "online", "walk-in", "advance", "reserve", "number", "call", "sampark", "bat", "baat"],
    answer: "You can book directly via our website, walk-in, or contact us for advance booking. \n- **Phone/WhatsApp**: +91 78779 58308\n- **Email**: info@hoteljaipurrajwada.com\nTo book online, just click on the 'Rooms' section and follow the easy steps!"
  },
  {
    category: "Payments & Invoices",
    keywords: ["payment", "pay", "cash", "upi", "credit card", "debit card", "card", "gst", "invoice", "refund", "cancellation", "cancel", "paise", "bhugtan"],
    answer: "We accept Cash, UPI, Credit Cards, and Debit Cards. Advance payment is required for confirmation. We can also provide a GST Invoice for corporate bookings. Please contact us for specific cancellation and refund policies based on your booking."
  },
  {
    category: "Food & Restaurant",
    keywords: ["food", "restaurant", "breakfast", "lunch", "dinner", "veg", "non-veg", "menu", "room service", "special request", "khana", "bhojan", "nashta", "dinner", "thali"],
    answer: "Our restaurant serves both Veg and Non-veg options. \n- **Breakfast**: 7:30 AM - 10:30 AM\n- Lunch and Dinner are available.\n- Room service is available 24/7. We cater to special food requests upon prior notice."
  },
  {
    category: "Facilities & Amenities",
    keywords: ["parking", "lift", "wifi", "wi-fi", "internet", "swimming", "pool", "garden", "banquet", "conference", "laundry", "power backup", "cctv", "security", "wheelchair", "suvidha", "gaadi", "car"],
    answer: "Facilities include: Free Wi-Fi, Parking, Lift access, 100% Power Backup, CCTV Security, Banquet hall for weddings, and a Conference room for meetings. Wheelchair access is available on the ground floor."
  },
  {
    category: "Family & Kids",
    keywords: ["kids", "child", "children", "baby", "infant", "family", "senior", "bacche", "bache", "parivar", "buzurg"],
    answer: "Kids under 5 stay free of charge without an extra bed. We have family rooms available. Extra beds can be provided upon request for a fee. The property is senior-citizen friendly with lift access."
  },
  {
    category: "Transport & Travel",
    keywords: ["taxi", "cab", "airport", "railway", "station", "bus", "transport", "sightseeing", "tourist", "ghumna", "ghoomne", "gadi", "gaadi", "travel"],
    answer: "We can arrange taxi services, airport/railway station transfers, and local sightseeing cabs. Please inquire at the travel desk/reception upon arrival or contact us in advance."
  },
  {
    category: "Policies & Rules",
    keywords: ["smoke", "smoking", "alcohol", "drink", "pet", "dog", "cat", "visitor", "noise", "rules", "nasha", "sharab", "janwar", "kutta", "mehman", "niyam"],
    answer: "Policies:\n- **Smoking**: Allowed only in designated areas. \n- **Pets**: Not allowed.\n- **Outside Food**: Not permitted.\n- **Visitors**: Allowed in the lobby area. ID proof is required for all guests."
  },
  {
    category: "Events",
    keywords: ["wedding", "birthday", "party", "corporate", "event", "meeting", "hall", "shaadi", "shadi", "janamdin", "function"],
    answer: "We host weddings, birthday parties, corporate events, and meetings. We have a spacious Banquet Hall and Conference Room. Please contact management at +91 78779 58308 for customized packages."
  },
  {
    category: "Emergency",
    keywords: ["emergency", "medical", "doctor", "fire", "lost", "found", "help", "aapatkalin", "madad", "bachao", "bimar"],
    answer: "In case of emergency, please contact the reception immediately. We have doctors on call and first-aid available. The premises are equipped with fire safety measures."
  },
  {
    category: "Greeting & Small Talk",
    keywords: ["hi", "hello", "hey", "namaste", "good morning", "good evening", "how are you", "help", "hii", "hiii", "kya haal", "kaise ho"],
    answer: "Namaste! Welcome to Hotel Jaipur Rajwada. I am your digital receptionist. I can help you with room bookings, pricing, amenities, location, and hotel policies. What would you like to know?"
  }
];

export const quickReplies = [
  "What is the check-in time?",
  "What is the room price?",
  "Where are you located?",
  "Do you have a restaurant?"
];

export const findAnswer = (question: string, dynamicData?: any) => {
  const lowerQ = question.toLowerCase();
  
  let bestMatch = null;
  let maxMatches = 0;

  for (const entry of knowledgeBase) {
    let matches = 0;
    for (const kw of entry.keywords) {
      if (lowerQ.includes(kw)) {
        matches++;
      }
    }
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = entry;
    }
  }

  if (bestMatch && maxMatches > 0) {
    let answer = bestMatch.answer;
    
    // Inject dynamic data if available
    if (dynamicData) {
      if (bestMatch.category === "Rooms & Pricing" && dynamicData.rooms) {
        answer = "We offer the following rooms:\n";
        dynamicData.rooms.forEach((r: any) => {
          answer += `- **${r.name}**: ₹${r.price}/night (${r.type}, capacity: ${r.capacity}). Amenities: ${r.amenities?.join(', ') || 'N/A'}.\n`;
        });
        answer += "\nAll rooms have attached bathrooms with 24/7 hot and cold water. Extra bed is available for a fee.";
      }
      
      if (bestMatch.category === "Contact & Booking" && dynamicData.settings) {
        answer = `You can book directly via our website, walk-in, or contact us for advance booking. \n- **Phone/WhatsApp**: ${dynamicData.settings.whatsapp || dynamicData.settings.phone || '+91 78779 58308'}\n- **Email**: ${dynamicData.settings.email || 'info@hoteljaipurrajwada.com'}\nTo book online, just click on the 'Rooms' section and follow the easy steps!`;
      }

      if (bestMatch.category === "Greeting & Small Talk" && dynamicData.settings) {
        answer = `Namaste! Welcome to ${dynamicData.settings.hotelName || 'Hotel Jaipur Rajwada'}. I am your digital receptionist. I can help you with room bookings, pricing, amenities, location, and hotel policies. What would you like to know?`;
      }
    }

    return answer;
  }

  const phone = dynamicData?.settings?.whatsapp || "+91 78779 58308";
  return `Sorry, I couldn't find that information. Please contact the hotel directly at ${phone}.`;
};
