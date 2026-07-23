export interface FAQ {
  id: string;
  category: string;
  question: string;
  altQuestions: string[];
  keywords: string[];
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "faq_1",
    category: "Rooms & Pricing",
    question: "What are the room prices at Hotel Jaipur Rajwada?",
    altQuestions: [
      "How much does a room cost?",
      "What is your room rent?",
      "Price?",
      "Room tariff",
      "Room rate per night",
      "Room kitne ka hai",
      "Room ka price kya hai",
      "Kitna rent hai room ka",
      "Price kitna hai"
    ],
    keywords: ["price", "cost", "rent", "tariff", "rate", "charges", "kitne", "paisa", "rupees", "amount"],
    answer: "Namaste! Our Deluxe Heritage Room starts at ₹3,500/night and the Royal Rajwada Suite starts at ₹5,500/night. Book directly on our website for exclusive discounts and free breakfast!"
  },
  {
    id: "faq_2",
    category: "Rooms & Pricing",
    question: "What room types are available at Hotel Jaipur Rajwada?",
    altQuestions: [
      "Which rooms do you have?",
      "Room types",
      "Types of rooms available",
      "Kaunse room hain",
      "Room categories",
      "Kitne prakar ke room hain"
    ],
    keywords: ["type", "types", "category", "categories", "deluxe", "suite", "heritage", "rajwada"],
    answer: "We offer two main room categories: Deluxe Heritage Room (₹3,500/night) and Royal Rajwada Suite (₹5,500/night), both featuring king beds, AC, Smart TV, and premium amenities."
  },
  {
    id: "faq_3",
    category: "Rooms & Pricing",
    question: "Tell me about the Deluxe Heritage Room.",
    altQuestions: [
      "Deluxe room details",
      "Deluxe Heritage Room price and facilities",
      "Deluxe room me kya kya hai",
      "Deluxe room rate"
    ],
    keywords: ["deluxe", "heritage", "3500", "room", "facilities"],
    answer: "The Deluxe Heritage Room (₹3,500/night) features traditional Rajasthani decor, plush king-size bed, air conditioning, 43-inch Smart TV, high-speed Wi-Fi, modern ensuite bathroom, and 24/7 room service."
  },
  {
    id: "faq_4",
    category: "Rooms & Pricing",
    question: "Tell me about the Royal Rajwada Suite.",
    altQuestions: [
      "Royal suite details",
      "Royal Rajwada Suite price and facilities",
      "Suite room kitne ka hai",
      "Rajwada suite rate"
    ],
    keywords: ["suite", "royal", "rajwada", "5500", "bathtub", "living", "fridge", "minibar"],
    answer: "The Royal Rajwada Suite (₹5,500/night) offers ultimate royal luxury with a spacious private living area, deep soaking bathtub, mini bar, 55-inch Smart TV, plush king bed, and complimentary welcome drinks."
  },
  {
    id: "faq_5",
    category: "Rooms & Pricing",
    question: "Are room rates inclusive of taxes?",
    altQuestions: [
      "Is GST included in room price?",
      "Tax extra hai kya",
      "Net price or plus tax"
    ],
    keywords: ["tax", "taxes", "gst", "inclusive", "exclusive", "extra"],
    answer: "Room rates displayed are base tariffs. Applicable GST (12% for rooms under ₹7,500) will be added at checkout."
  },
  {
    id: "faq_6",
    category: "Rooms & Pricing",
    question: "Is seasonal pricing or weekend tariff higher?",
    altQuestions: [
      "Weekend room rates",
      "Festival season price",
      "Peak season rate"
    ],
    keywords: ["weekend", "seasonal", "peak", "festival", "holiday", "diwali", "newyear"],
    answer: "Base tariffs remain competitive year-round. During peak festival dates (Diwali, New Year, Pushkar Fair), minor seasonal adjustments may apply. Direct booking guarantees best rates."
  },
  {
    id: "faq_7",
    category: "Rooms & Pricing",
    question: "Do you offer day use or hourly room stay?",
    altQuestions: [
      "Hourly room booking",
      "Day use room",
      "4 hour room stay",
      "Day package"
    ],
    keywords: ["hourly", "dayuse", "hours", "daystay", "short"],
    answer: "We primarily offer overnight stays. For short transit day-use (subject to availability), please contact reception directly at +91 78779 58308."
  },
  {
    id: "faq_8",
    category: "Rooms & Pricing",
    question: "Can I upgrade my room upon arrival?",
    altQuestions: [
      "Room upgrade available",
      "Deluxe to Suite upgrade",
      "Upgrade cost"
    ],
    keywords: ["upgrade", "higher", "suite", "change"],
    answer: "Yes, room upgrades from Deluxe Heritage to Royal Rajwada Suite are available at check-in subject to suite availability upon paying the difference."
  },
  {
    id: "faq_9",
    category: "Rooms & Pricing",
    question: "What is the maximum occupancy per room?",
    altQuestions: [
      "How many guests in one room?",
      "Ek room me kitne log reh sakte hain",
      "Maximum guests per room"
    ],
    keywords: ["occupancy", "capacity", "guests", "persons", "log", "people"],
    answer: "Deluxe Heritage Room accommodates up to 2 Adults + 1 Child. Royal Rajwada Suite accommodates up to 3 Adults or 2 Adults + 2 Children with an extra mattress."
  },
  {
    id: "faq_10",
    category: "Rooms & Pricing",
    question: "Are there interconnecting rooms for big families?",
    altQuestions: [
      "Connecting rooms",
      "Interconnecting rooms",
      "Family connected rooms"
    ],
    keywords: ["interconnecting", "connecting", "adjacent", "family"],
    answer: "We have adjacent rooms for large families and groups. Please mention your preference during booking or contact reception to reserve adjacent rooms."
  },
  {
    id: "faq_11",
    category: "Location & Contact",
    question: "Where is Hotel Jaipur Rajwada located?",
    altQuestions: [
      "What is your address?",
      "Hotel location",
      "Where are you located?",
      "Location bhejo",
      "Hotel kidhar hai",
      "Address kya hai",
      "Location map link"
    ],
    keywords: ["location", "address", "where", "reach", "map", "nh11c", "achrol", "delhi", "jaipur", "syari", "talamod", "kidhar"],
    answer: "Hotel Jaipur Rajwada is located on Delhi–Jaipur Highway (NH-11C), Syari, Talamod, Achrol, Rajasthan 303002. Situated directly on the main highway for convenient access!"
  },
  {
    id: "faq_12",
    category: "Location & Contact",
    question: "How can I contact Hotel Jaipur Rajwada reception?",
    altQuestions: [
      "Contact details",
      "Phone number",
      "WhatsApp number",
      "Email address",
      "Reception number kya hai",
      "Phone no"
    ],
    keywords: ["contact", "phone", "number", "whatsapp", "email", "reception", "call", "mobile", "number"],
    answer: "You can reach reception 24/7 at +91 78779 58308 or via WhatsApp at +91 78779 58308. Email: info@hoteljaipurrajwada.com."
  },
  {
    id: "faq_13",
    category: "Location & Contact",
    question: "What is the exact landmark near Hotel Jaipur Rajwada?",
    altQuestions: [
      "Nearest landmark",
      "Hotel landmark",
      "Achrol landmark"
    ],
    keywords: ["landmark", "near", "opposite", "talamod", "syari", "achrol"],
    answer: "We are located near Talamod cut on NH-11C Delhi-Jaipur Highway, Achrol, right opposite Syari milestone."
  },
  {
    id: "faq_14",
    category: "Location & Contact",
    question: "Is the hotel easily accessible from Delhi-Jaipur Highway?",
    altQuestions: [
      "Highway access",
      "Is hotel on main highway?",
      "NH 11C road access"
    ],
    keywords: ["highway", "nh11c", "road", "main", "access", "delhi"],
    answer: "Yes, Hotel Jaipur Rajwada has direct, smooth driveway entry right off National Highway 11C (Delhi-Jaipur Highway), making it ideal for road travelers and tourists."
  },
  {
    id: "faq_15",
    category: "Location & Contact",
    question: "Can you send location on WhatsApp?",
    altQuestions: [
      "WhatsApp location",
      "Send google maps link",
      "Location link on whatsapp"
    ],
    keywords: ["whatsapp", "location", "map", "link", "bhejo", "send"],
    answer: "Yes! Click the WhatsApp button on our website or text 'Location' to +91 78779 58308, and our bot/team will send the live Google Maps pin immediately."
  },
  {
    id: "faq_16",
    category: "Parking & Transport",
    question: "Do you have free parking for guests?",
    altQuestions: [
      "Is parking available?",
      "Car parking charges",
      "Parking free hai",
      "Gadi park karne ki jagah hai kya",
      "Bus parking available"
    ],
    keywords: ["parking", "car", "vehicle", "bus", "park", "gadi", "free", "valet"],
    answer: "Yes! We provide free secure on-site parking with 24/7 CCTV surveillance for all hotel guests. Free parking is also available for tour buses."
  },
  {
    id: "faq_17",
    category: "Parking & Transport",
    question: "Is valet parking service available?",
    altQuestions: [
      "Valet parking",
      "Car parking assistance"
    ],
    keywords: ["valet", "driver", "park"],
    answer: "Yes, our bell desk and staff provide valet parking assistance upon request at arrival."
  },
  {
    id: "faq_18",
    category: "Parking & Transport",
    question: "Is driver accommodation or waiting room available?",
    altQuestions: [
      "Driver room",
      "Driver stay facility",
      "Driver washroom"
    ],
    keywords: ["driver", "stay", "accommodation", "restroom"],
    answer: "We offer driver rest areas and washroom facilities on site. Affordable driver dormitory beds are available upon request."
  },
  {
    id: "faq_19",
    category: "Parking & Transport",
    question: "Do you arrange taxi or pickup from Jaipur Railway Station / Airport?",
    altQuestions: [
      "Airport pickup taxi",
      "Railway station cab",
      "Taxi service",
      "Pickup charges"
    ],
    keywords: ["taxi", "cab", "pickup", "drop", "airport", "station", "car", "rental"],
    answer: "Yes! We arrange private AC taxi pickups and drops for Jaipur Airport, Railway Station, and local sightseeing. Please contact reception 2 hours prior."
  },
  {
    id: "faq_20",
    category: "Parking & Transport",
    question: "Is EV charging station available at the hotel?",
    altQuestions: [
      "EV charger",
      "Electric vehicle charging"
    ],
    keywords: ["ev", "electric", "charger", "charging"],
    answer: "Standard 15A electric sockets are available for EV charging assistance. Please inform reception upon arrival."
  },
  {
    id: "faq_21",
    category: "Policies",
    question: "Are unmarried couples allowed to stay?",
    altQuestions: [
      "Can unmarried couples stay?",
      "Couple friendly policy",
      "Couple allowed hai",
      "Unmarried couple ID policy",
      "Local couple allowed"
    ],
    keywords: ["couple", "unmarried", "couples", "pair", "ladka", "ladki", "local"],
    answer: "Yes, Hotel Jaipur Rajwada is 100% couple-friendly! Unmarried and local couples aged 18+ are welcome with valid government photo IDs."
  },
  {
    id: "faq_22",
    category: "Policies",
    question: "Which IDs are accepted for check-in?",
    altQuestions: [
      "ID required for check in",
      "Is Pan card accepted?",
      "Valid identity proof"
    ],
    keywords: ["id", "proof", "aadhaar", "passport", "voter", "dl", "pancard", "identity"],
    answer: "We accept Aadhaar Card, Passport, Driving License, or Voter ID. PAN card is NOT accepted as identity proof per government regulations."
  },
  {
    id: "faq_23",
    category: "Policies",
    question: "What are your check-in and check-out timings?",
    altQuestions: [
      "Check in time",
      "Check out time",
      "Check in kab hai",
      "Checkout kitne baje hai",
      "In time out time"
    ],
    keywords: ["checkin", "checkout", "timing", "time", "baje", "schedule", "hours"],
    answer: "Standard check-in time is 12:00 PM and check-out time is 11:00 AM."
  },
  {
    id: "faq_24",
    category: "Policies",
    question: "Is early check-in allowed?",
    altQuestions: [
      "Early check in charges",
      "Can I check in at 8 AM?",
      "Early check-in cost"
    ],
    keywords: ["early", "checkin", "morning", "8am", "9am", "10am"],
    answer: "Early check-in before 12:00 PM is subject to room availability. Early check-in between 8:00 AM - 12:00 PM may incur nominal charges."
  },
  {
    id: "faq_25",
    category: "Policies",
    question: "Is late check-out available?",
    altQuestions: [
      "Late check out fee",
      "Can I check out at 3 PM?",
      "Late departure"
    ],
    keywords: ["late", "checkout", "afternoon", "extension"],
    answer: "Late check-out up to 2:00 PM can be arranged based on availability. Extended check-out after 2:00 PM may attract half-day tariff."
  },
  {
    id: "faq_26",
    category: "Policies",
    question: "What is your smoking policy?",
    altQuestions: [
      "Is smoking allowed in room?",
      "Smoking room",
      "Designated smoking area"
    ],
    keywords: ["smoking", "smoke", "cigarette", "vape"],
    answer: "Smoking is strictly prohibited inside guest bedrooms for health and safety. Designated outdoor smoking areas are provided on balconies and gardens."
  },
  {
    id: "faq_27",
    category: "Policies",
    question: "Are pets allowed at the hotel?",
    altQuestions: [
      "Pet friendly hotel",
      "Can I bring my dog?",
      "Pet policy"
    ],
    keywords: ["pet", "pets", "dog", "cat", "animals"],
    answer: "To ensure comfort for all guests, pets are generally not allowed inside rooms. Please contact management for guide dog exceptions."
  },
  {
    id: "faq_28",
    category: "Policies",
    question: "Is alcohol permitted in rooms?",
    altQuestions: [
      "Can we drink alcohol in room?",
      "Liquor policy"
    ],
    keywords: ["alcohol", "drink", "liquor", "beer", "wine"],
    answer: "Moderate alcohol consumption inside private guest rooms is permitted. Loud behavior or public disturbance in corridors is prohibited."
  },
  {
    id: "faq_29",
    category: "Policies",
    question: "What is the visitor policy for guest rooms?",
    altQuestions: [
      "Can outsiders visit my room?",
      "Guest visitor policy"
    ],
    keywords: ["visitor", "visitors", "outsider", "friend", "guest"],
    answer: "External visitors are welcome in the lobby and restaurant till 9:00 PM. Room visits require visitor ID registration at reception."
  },
  {
    id: "faq_30",
    category: "Policies",
    question: "Is 24-hour check-in available?",
    altQuestions: [
      "Late night check in",
      "Can I check in at 2 AM?",
      "Night arrival check in"
    ],
    keywords: ["24hour", "night", "late", "checkin", "midnight"],
    answer: "Yes! Our reception desk operates 24/7. You can check in at any hour if you have a confirmed reservation."
  },
  {
    id: "faq_31",
    category: "Food & Dining",
    question: "Does the hotel have a restaurant?",
    altQuestions: [
      "Is food available?",
      "Do you have a multi-cuisine restaurant?",
      "Khana milega",
      "Restaurant timing"
    ],
    keywords: ["restaurant", "food", "dining", "khana", "breakfast", "lunch", "dinner", "menu", "veg", "nonveg"],
    answer: "Yes! Our in-house multi-cuisine restaurant serves delicious Rajasthani Thali, North Indian, South Indian, Chinese, and Continental dishes."
  },
  {
    id: "faq_32",
    category: "Food & Dining",
    question: "Is pure vegetarian food available?",
    altQuestions: [
      "Is vegetarian food pure?",
      "Jain food available?",
      "Veg dishes"
    ],
    keywords: ["veg", "vegetarian", "pureveg", "jain", "swaminarayan"],
    answer: "Yes! We prepare pure vegetarian and Jain dishes in separate dedicated cookware upon request."
  },
  {
    id: "faq_33",
    category: "Food & Dining",
    question: "Is non-vegetarian food available?",
    altQuestions: [
      "Do you serve chicken or mutton?",
      "Non veg food menu"
    ],
    keywords: ["nonveg", "chicken", "mutton", "fish", "egg"],
    answer: "Yes, we serve mouthwatering non-vegetarian delicacies including authentic Laal Maas, Butter Chicken, and kebabs."
  },
  {
    id: "faq_34",
    category: "Food & Dining",
    question: "Is breakfast included with the room?",
    altQuestions: [
      "Breakfast time",
      "Breakfast charges",
      "Breakfast milega",
      "Nashta free hai kya"
    ],
    keywords: ["breakfast", "nashta", "buffet", "morning", "included", "free", "730am"],
    answer: "Complimentary buffet breakfast is included with direct website room bookings! Breakfast is served daily from 7:30 AM to 10:30 AM."
  },
  {
    id: "faq_35",
    category: "Food & Dining",
    question: "What are the restaurant lunch and dinner timings?",
    altQuestions: [
      "Lunch time",
      "Dinner time",
      "Restaurant opening hours"
    ],
    keywords: ["lunch", "dinner", "timing", "hours", "afternoon", "night"],
    answer: "Lunch is served from 12:30 PM to 3:30 PM. Dinner is served from 7:30 PM to 11:00 PM."
  },
  {
    id: "faq_36",
    category: "Food & Dining",
    question: "Is 24/7 room service available?",
    altQuestions: [
      "In-room dining",
      "Night food ordering",
      "Can I order food at midnight?"
    ],
    keywords: ["roomservice", "dining", "inroom", "night", "24x7", "midnight"],
    answer: "Yes! 24-hour in-room dining service is available. A night menu is accessible after 11:00 PM."
  },
  {
    id: "faq_37",
    category: "Food & Dining",
    question: "Do you serve Rajasthani specialities like Dal Baati Churma?",
    altQuestions: [
      "Rajasthani thali",
      "Laal maas",
      "Local food in Jaipur"
    ],
    keywords: ["rajasthani", "dalbaati", "churma", "laalmaas", "local", "thali", "specialty"],
    answer: "Yes! Our chef specializes in traditional Rajasthani Thali, Dal Baati Churma, Gatte ki Sabzi, and authentic Laal Maas."
  },
  {
    id: "faq_38",
    category: "Food & Dining",
    question: "Is room service charge extra?",
    altQuestions: [
      "Delivery charge for room service",
      "Service tax on food"
    ],
    keywords: ["service", "charge", "delivery", "extra", "cost"],
    answer: "Standard menu prices apply for room service with no hidden surcharge."
  },
  {
    id: "faq_39",
    category: "Food & Dining",
    question: "Can outside food or Swiggy/Zomato be ordered?",
    altQuestions: [
      "Outside food allowed",
      "Swiggy allowed",
      "Zomato delivery to room"
    ],
    keywords: ["swiggy", "zomato", "outside", "food", "delivery"],
    answer: "Food deliveries from Zomato/Swiggy are received at reception lobby desk for guest convenience."
  },
  {
    id: "faq_40",
    category: "Food & Dining",
    question: "Do you serve tea, coffee, and evening snacks?",
    altQuestions: [
      "High tea",
      "Snacks menu",
      "Coffee time"
    ],
    keywords: ["tea", "coffee", "chai", "snacks", "samosa", "pakora", "evening"],
    answer: "Yes, hot masala chai, filter coffee, pakoras, and fresh snacks are available at our garden café throughout the day."
  },
  {
    id: "faq_41",
    category: "Amenities",
    question: "Is free Wi-Fi available in rooms?",
    altQuestions: [
      "Internet speed",
      "Wi-Fi password",
      "WiFi free hai",
      "Internet milega"
    ],
    keywords: ["wifi", "internet", "wi-fi", "wireless", "speed", "net", "broadband"],
    answer: "Yes, high-speed optic fiber Wi-Fi is complimentary in all rooms, suites, restaurant, and lobby area."
  },
  {
    id: "faq_42",
    category: "Amenities",
    question: "Do rooms have air conditioning (AC)?",
    altQuestions: [
      "Is AC available in rooms?",
      "AC room available",
      "AC hai kya",
      "Heater in winter"
    ],
    keywords: ["ac", "aircon", "cooling", "climate", "temperature", "heater"],
    answer: "Yes, all rooms feature individual remote-controlled split air conditioners with heating mode for winter nights."
  },
  {
    id: "faq_43",
    category: "Amenities",
    question: "Do rooms have a Smart TV?",
    altQuestions: [
      "Is TV available?",
      "Can I watch Netflix/YouTube on room TV?",
      "TV hai room me"
    ],
    keywords: ["tv", "smart", "television", "netflix", "youtube", "hdmi", "dth"],
    answer: "Yes, every room has a 43\" or 55\" HD Smart LED TV pre-loaded with OTT apps and satellite HD channels."
  },
  {
    id: "faq_44",
    category: "Amenities",
    question: "Do you have a bathtub in the rooms?",
    altQuestions: [
      "Which room has a bathtub?",
      "Bathtub available",
      "Bathtub hai kya"
    ],
    keywords: ["bathtub", "tub", "bath", "soaking", "jacuzzi", "suite"],
    answer: "Our Royal Rajwada Suite features a spacious deep soaking bathtub along with luxury bath salts and amenities."
  },
  {
    id: "faq_45",
    category: "Amenities",
    question: "Is mini bar available in rooms?",
    altQuestions: [
      "Mini fridge in room",
      "Mini bar charges"
    ],
    keywords: ["minibar", "fridge", "refrigerator", "drinks", "beverages", "snack"],
    answer: "Yes, Royal Rajwada Suites feature a mini refrigerator stocked with soft drinks, juices, and snacks."
  },
  {
    id: "faq_46",
    category: "Amenities",
    question: "Do you have 24-hour power backup?",
    altQuestions: [
      "Is generator available during power cut?",
      "Electricity backup"
    ],
    keywords: ["power", "backup", "generator", "electricity", "powercut"],
    answer: "Yes, we have 100% heavy-duty automatic generator backup ensuring uninterrupted AC and lighting."
  },
  {
    id: "faq_47",
    category: "Amenities",
    question: "Is hot water available 24/7 in bathrooms?",
    altQuestions: [
      "Geyser in bathroom",
      "Hot water timing"
    ],
    keywords: ["hotwater", "geyser", "shower", "water", "warm"],
    answer: "Yes, 24/7 central solar geyser supply guarantees instant hot running water in all ensuite bathrooms."
  },
  {
    id: "faq_48",
    category: "Amenities",
    question: "Do rooms have an electric kettle for tea/coffee?",
    altQuestions: [
      "Tea coffee maker in room",
      "Electric kettle available"
    ],
    keywords: ["kettle", "tea", "coffee", "maker", "sachets", "sugar", "milk"],
    answer: "Yes, electric kettle with complimentary green tea, black tea, coffee sachets, and sugar cubes is provided in every room."
  },
  {
    id: "faq_49",
    category: "Amenities",
    question: "Are iron and ironing board provided?",
    altQuestions: [
      "Iron for clothes",
      "Clothes press facility"
    ],
    keywords: ["iron", "ironing", "board", "press", "laundry"],
    answer: "Iron and ironing board are provided to your room on request free of charge. Same-day laundry service is also available."
  },
  {
    id: "faq_50",
    category: "Amenities",
    question: "Do bathrooms have hairdryer and toiletries?",
    altQuestions: [
      "Hair dryer in bathroom",
      "Shampoo soap provided"
    ],
    keywords: ["hairdryer", "dryer", "toiletries", "shampoo", "soap", "towel", "dental"],
    answer: "Yes! Complete dental kit, luxury shampoo, body wash, moisturizer, fresh plush towels, and hairdryer are included."
  },
  {
    id: "faq_51",
    category: "Amenities",
    question: "Do rooms have a private balcony or view?",
    altQuestions: [
      "Balcony room available",
      "Garden view room",
      "Highway view room"
    ],
    keywords: ["balcony", "view", "garden", "scenic", "window", "terrace"],
    answer: "Selected Deluxe Heritage Rooms and Royal Suites feature private step-out balconies with scenic Aravalli hill views."
  },
  {
    id: "faq_52",
    category: "Amenities",
    question: "Do you have a swimming pool?",
    altQuestions: [
      "Swimming pool timings",
      "Pool available",
      "Pool hai kya",
      "Cost of pool access"
    ],
    keywords: ["pool", "swimming", "swim", "water", "costumes", "poolside"],
    answer: "Yes! Outdoor swimming pool access is complimentary for all in-house staying guests from 7:00 AM to 7:00 PM."
  },
  {
    id: "faq_53",
    category: "Amenities",
    question: "Is daily housekeeping provided?",
    altQuestions: [
      "Room cleaning time",
      "Linen change daily"
    ],
    keywords: ["housekeeping", "cleaning", "clean", "linen", "towel", "bedsheet"],
    answer: "Yes, daily morning housekeeping and linen refresh service is conducted for all staying rooms."
  },
  {
    id: "faq_54",
    category: "Amenities",
    question: "Is room safe or locker provided?",
    altQuestions: [
      "Electronic safe in room",
      "Locker for valuables"
    ],
    keywords: ["safe", "locker", "electronic", "valuables", "security"],
    answer: "Digital electronic safes are provided in Royal Rajwada Suites for securing cash, jewelry, and passports."
  },
  {
    id: "faq_55",
    category: "Amenities",
    question: "Do you have a elevator / lift?",
    altQuestions: [
      "Is lift available?",
      "Wheelchair accessible lift"
    ],
    keywords: ["lift", "elevator", "stairs", "wheelchair", "access"],
    answer: "Yes, automatic passenger elevator serves all room floors effortlessly."
  },
  {
    id: "faq_56",
    category: "Events & Weddings",
    question: "Can I book Hotel Jaipur Rajwada for weddings?",
    altQuestions: [
      "Destination wedding in Jaipur",
      "Wedding lawn booking",
      "Shadi venue rate"
    ],
    keywords: ["wedding", "marriages", "shadi", "shaadi", "destination", "bride", "groom", "lawn", "mandap"],
    answer: "Yes! We host royal destination weddings with capacity for 200 to 1,000 guests across our lush wedding lawn and banquet halls."
  },
  {
    id: "faq_57",
    category: "Events & Weddings",
    question: "Do you have a banquet hall for birthday parties and family events?",
    altQuestions: [
      "Birthday party venue",
      "Anniversary party booking",
      "Small party hall"
    ],
    keywords: ["birthday", "party", "anniversary", "banquet", "hall", "celebration", "family"],
    answer: "Yes, our indoor AC banquet hall is ideal for birthdays, anniversaries, ring ceremonies, and private family get-togethers."
  },
  {
    id: "faq_58",
    category: "Events & Weddings",
    question: "Do you offer conference hall facilities for corporate events?",
    altQuestions: [
      "Corporate meeting room",
      "Conference hall rate",
      "Business seminar venue"
    ],
    keywords: ["conference", "corporate", "meeting", "seminar", "projector", "business", "hall"],
    answer: "Yes! Our corporate conference hall features HD projector, high-speed Wi-Fi, audio-visual system, and executive catering packages."
  },
  {
    id: "faq_59",
    category: "Events & Weddings",
    question: "Do you provide wedding catering and decoration services?",
    altQuestions: [
      "Wedding decorator",
      "Catering service for marriage",
      "DJ and music setup"
    ],
    keywords: ["catering", "decoration", "decorator", "stage", "dj", "music", "food", "buffet"],
    answer: "We offer complete end-to-end event planning including theme floral decor, DJ sound, lighting, royal mandap setup, and custom multi-cuisine catering."
  },
  {
    id: "faq_60",
    category: "Events & Weddings",
    question: "How do I get an event quote or book a hall tour?",
    altQuestions: [
      "Event inquiry phone number",
      "Banquet price quote"
    ],
    keywords: ["quote", "pricing", "tour", "visit", "event", "manager", "booking"],
    answer: "Please call our Event Manager at +91 78779 58308 or email info@hoteljaipurrajwada.com to schedule a site visit and custom package consultation."
  },
  {
    id: "faq_61",
    category: "Nearby Attractions",
    question: "How far is Amer / Amber Fort from the hotel?",
    altQuestions: [
      "Amber fort distance",
      "Amer fort drive time",
      "How to go to Amber Fort"
    ],
    keywords: ["amer", "amber", "fort", "distance", "km", "drive", "heritage", "tourist"],
    answer: "Amer Fort is just 22 km (~25 minutes drive) straight down the highway from Hotel Jaipur Rajwada."
  },
  {
    id: "faq_62",
    category: "Nearby Attractions",
    question: "How far is Achrol Fort from the hotel?",
    altQuestions: [
      "Achrol fort trekking",
      "Achrol fort distance"
    ],
    keywords: ["achrol", "fort", "trekking", "ruins", "distance", "km", "5km"],
    answer: "Achrol Fort and historic ruins are located just 5 km (~10 minutes) from our hotel premises."
  },
  {
    id: "faq_63",
    category: "Nearby Attractions",
    question: "How far is Jal Mahal (Water Palace)?",
    altQuestions: [
      "Jal mahal distance",
      "Water palace Jaipur"
    ],
    keywords: ["jal", "mahal", "water", "palace", "lake", "distance", "km", "28km"],
    answer: "Jal Mahal is approximately 28 km (~35 minutes) along the scenic Amer Road."
  },
  {
    id: "faq_64",
    category: "Nearby Attractions",
    question: "How far is Hawa Mahal and City Palace?",
    altQuestions: [
      "Hawa mahal distance",
      "City palace Jaipur distance",
      "Johari bazaar distance"
    ],
    keywords: ["hawa", "mahal", "city", "palace", "johari", "bazaar", "distance", "32km"],
    answer: "Hawa Mahal, City Palace, and the Old Pink City markets are located 32 km (~40 minutes) from the hotel."
  },
  {
    id: "faq_65",
    category: "Nearby Attractions",
    question: "How far is Nahargarh Fort and Jaigarh Fort?",
    altQuestions: [
      "Nahargarh fort sunset point",
      "Jaigarh fort cannon distance"
    ],
    keywords: ["nahargarh", "jaigarh", "fort", "sunset", "cannon", "distance", "30km"],
    answer: "Nahargarh Fort and Jaigarh Fort are approx. 30 km away, perfect for evening sunset panoramas of Jaipur city."
  },
  {
    id: "faq_66",
    category: "Nearby Attractions",
    question: "Can the hotel arrange a local Jaipur sightseeing tour?",
    altQuestions: [
      "Jaipur tour package",
      "Sightseeing cab booking",
      "Full day Jaipur cab"
    ],
    keywords: ["tour", "sightseeing", "package", "cab", "driver", "guide", "places"],
    answer: "Yes, our travel desk arranges full-day or half-day private AC cab tours covering all top forts, palaces, and markets of Jaipur."
  },
  {
    id: "faq_67",
    category: "Nearby Attractions",
    question: "Are there elephant safari or camel ride activities nearby?",
    altQuestions: [
      "Elephant ride at Amber Fort",
      "Camel safari near hotel"
    ],
    keywords: ["elephant", "camel", "safari", "ride", "amer", "activity", "kids"],
    answer: "Elephant rides at Amer Fort base (22 km) and local camel rides along Aravalli countryside can be easily arranged."
  },
  {
    id: "faq_68",
    category: "Nearby Attractions",
    question: "Is Samode Palace near Hotel Jaipur Rajwada?",
    altQuestions: [
      "Samode palace distance",
      "Samode fort visit"
    ],
    keywords: ["samode", "palace", "distance", "heritage"],
    answer: "Samode Palace is located approx. 25 km from our hotel, ideal for a heritage day excursion."
  },
  {
    id: "faq_69",
    category: "Payment & Policies",
    question: "What payment options are available?",
    altQuestions: [
      "Payment modes",
      "Can I pay via GPay / PhonePe?",
      "Card payment accepted"
    ],
    keywords: ["payment", "mode", "upi", "gpay", "phonepe", "paytm", "card", "visa", "mastercard", "cash", "online"],
    answer: "We accept Cash, UPI (Google Pay, PhonePe, Paytm), Net Banking, and major Credit/Debit cards (Visa, Mastercard, RuPay)."
  },
  {
    id: "faq_70",
    category: "Payment & Policies",
    question: "Do you provide GST tax invoices for corporate bookings?",
    altQuestions: [
      "GST invoice for business",
      "Company billing invoice",
      "GST claim invoice"
    ],
    keywords: ["gst", "invoice", "bill", "company", "tax", "corporate", "billing"],
    answer: "Yes! We issue official GST tax invoices with your company GSTIN upon check-out."
  },
  {
    id: "faq_71",
    category: "Payment & Policies",
    question: "What is the booking deposit requirement?",
    altQuestions: [
      "Advance payment for room",
      "Partial advance booking"
    ],
    keywords: ["advance", "deposit", "partial", "payment", "token", "booking"],
    answer: "A nominal 30% advance deposit secures your reservation, with remaining balance payable upon arrival check-in."
  },
  {
    id: "faq_72",
    category: "Payment & Policies",
    question: "What is your full cancellation policy?",
    altQuestions: [
      "Full refund cancellation time",
      "Booking cancel charge"
    ],
    keywords: ["cancellation", "cancel", "refund", "policy", "hours", "48hours", "retention"],
    answer: "Cancellations made 48 hours prior to check-in get 100% full refund. Cancellations within 48 hours incur a 1-night retention charge."
  },
  {
    id: "faq_73",
    category: "Payment & Policies",
    question: "How long does refund processing take?",
    altQuestions: [
      "Refund time period",
      "When will I get my refund back?"
    ],
    keywords: ["refund", "days", "processing", "bank", "account", "upi"],
    answer: "Approved cancellation refunds are processed back to your original payment method within 3 to 5 business days."
  },
  {
    id: "faq_74",
    category: "Family & Children",
    question: "Are family rooms available?",
    altQuestions: [
      "Big room for 4 people",
      "Family suite"
    ],
    keywords: ["family", "rooms", "quad", "group", "parents", "kids"],
    answer: "Yes! Our Royal Rajwada Suite is spacious enough for families, and we can place extra mattresses upon request."
  },
  {
    id: "faq_75",
    category: "Family & Children",
    question: "What is the charge for children?",
    altQuestions: [
      "Kid stay charges",
      "Child below 5 years cost"
    ],
    keywords: ["child", "kids", "children", "age", "under5", "free", "charge"],
    answer: "Children up to 5 years stay complimentary with parents. Children aged 6-12 without extra bed incur ₹500/night including breakfast."
  },
  {
    id: "faq_76",
    category: "Family & Children",
    question: "Is extra bed / mattress available?",
    altQuestions: [
      "Extra bed cost",
      "Extra mattress price",
      "Rollaway bed"
    ],
    keywords: ["extrabed", "bed", "mattress", "rollaway", "charge", "1000"],
    answer: "Yes, comfortable extra mattresses with complete bedding are provided at ₹1,000/night (includes breakfast)."
  },
  {
    id: "faq_77",
    category: "Family & Children",
    question: "Do you provide milk or baby food preparation assistance?",
    altQuestions: [
      "Milk for baby",
      "Baby food warm up"
    ],
    keywords: ["baby", "milk", "food", "infant", "warm", "kitchen"],
    answer: "Our kitchen team happily provides warm milk, boiled water, or custom porridge for infants upon request."
  },
  {
    id: "faq_78",
    category: "Offers & Direct Booking",
    question: "Why should I book directly on your official website?",
    altQuestions: [
      "Benefits of direct booking",
      "Official website booking perks"
    ],
    keywords: ["direct", "official", "website", "perks", "benefits", "discount", "bestrate"],
    answer: "Direct bookings on our official website guarantee: 1) Lowest price match guarantee 2) Free breakfast 3) Priority early check-in 4) Free cancellation!"
  },
  {
    id: "faq_79",
    category: "Offers & Direct Booking",
    question: "Do you have promo codes or discount coupons?",
    altQuestions: [
      "Promo code for hotel",
      "Coupon code for room booking"
    ],
    keywords: ["promo", "code", "coupon", "discount", "deal", "offer"],
    answer: "Direct website visitors automatically get up to 15% off applied at checkout. No code required!"
  },
  {
    id: "faq_80",
    category: "Offers & Direct Booking",
    question: "Are long stay or monthly rental discounts available?",
    altQuestions: [
      "Weekly stay discount",
      "Long stay room package",
      "15 days stay rate"
    ],
    keywords: ["longstay", "weekly", "monthly", "extended", "rental", "package"],
    answer: "Yes! For stays longer than 5 nights or monthly corporate bookings, contact management for special discounted tariffs."
  },
  {
    id: "faq_81",
    category: "Transport & Distances",
    question: "What is the distance from Jaipur Junction Railway Station?",
    altQuestions: [
      "Jaipur railway station to hotel distance",
      "Station se kitna door hai"
    ],
    keywords: ["railway", "station", "junction", "distance", "km", "35km", "train"],
    answer: "Jaipur Junction Railway Station is approx. 35 km away (~45 minutes via NH-11C expressway)."
  },
  {
    id: "faq_82",
    category: "Transport & Distances",
    question: "What is the distance from Jaipur International Airport (JAI)?",
    altQuestions: [
      "Jaipur airport to hotel distance",
      "Airport se distance"
    ],
    keywords: ["airport", "jai", "sanganer", "distance", "km", "38km", "flight"],
    answer: "Jaipur International Airport (JAI) is approx. 38 km away (~50 minutes drive)."
  },
  {
    id: "faq_83",
    category: "Transport & Distances",
    question: "What is the distance from Sindhi Camp Bus Stand Jaipur?",
    altQuestions: [
      "Bus stand distance",
      "Sindhi camp to hotel"
    ],
    keywords: ["bus", "stand", "sindhi", "camp", "distance", "33km"],
    answer: "Sindhi Camp Central Bus Stand is approx. 33 km (~40 minutes drive)."
  },
  {
    id: "faq_84",
    category: "Transport & Distances",
    question: "Is public transport / Uber / Ola available at the hotel?",
    altQuestions: [
      "Uber available at hotel",
      "Ola cab service in Achrol",
      "State transport bus"
    ],
    keywords: ["uber", "ola", "cab", "bus", "public", "transport", "auto"],
    answer: "Local buses and private cabs run frequently along NH-11C. Uber and Ola cabs can also be booked to and from our location."
  },
  {
    id: "faq_85",
    category: "Safety & Security",
    question: "Is the hotel safe for solo female travelers?",
    altQuestions: [
      "Safety for women travelers",
      "Solo female guest security"
    ],
    keywords: ["safe", "safety", "female", "solo", "women", "security", "cctv"],
    answer: "100% safe! We maintain 24/7 round-the-clock CCTV security monitoring, gated entry, and verified professional staff."
  },
  {
    id: "faq_86",
    category: "Safety & Security",
    question: "Do you have doctor on call facility?",
    altQuestions: [
      "Medical emergency",
      "Hospital nearby",
      "Doctor on call"
    ],
    keywords: ["doctor", "medical", "hospital", "emergency", "medicine", "clinic"],
    answer: "Yes, doctor-on-call service is available, and first-aid kits are maintained at reception. Primary health centers and major hospitals are nearby."
  },
  {
    id: "faq_87",
    category: "Safety & Security",
    question: "Is power backup available for medical devices / CPAP?",
    altQuestions: [
      "CPAP medical machine power",
      "Continuous power supply"
    ],
    keywords: ["cpap", "medical", "power", "electricity", "uninterrupted"],
    answer: "Yes, our dual industrial generators provide continuous 24/7 power supply."
  },
  {
    id: "faq_88",
    category: "Hinglish / Hindi Queries",
    question: "Room kitne ka hai? (What is room price?)",
    altQuestions: [
      "Room rent kitna hai",
      "Price kya hai room ka",
      "Ek raat ka kitna charge hai"
    ],
    keywords: ["kitne", "rent", "price", "charge", "paisa", "raat", "kitna", "hai"],
    answer: "Deluxe Heritage Room ₹3,500/night aur Royal Rajwada Suite ₹5,500/night hai. Website se direct book karne par discount aur free breakfast milega!"
  },
  {
    id: "faq_89",
    category: "Hinglish / Hindi Queries",
    question: "Parking free hai kya? (Is parking free?)",
    altQuestions: [
      "Gadi park karne ka charge",
      "Car parking hai kya"
    ],
    keywords: ["parking", "free", "gadi", "park", "charge", "hai", "kya"],
    answer: "Haan ji! Hotel me guests ke liye free secure parking aur 24/7 CCTV surveillance available hai."
  },
  {
    id: "faq_90",
    category: "Hinglish / Hindi Queries",
    question: "Check in kab hai? (When is check-in time?)",
    altQuestions: [
      "Check in ka time kya hai",
      "Check out kitne baje hai"
    ],
    keywords: ["checkin", "checkout", "time", "kab", "baje", "hai"],
    answer: "Check-in time 12:00 PM aur check-out time 11:00 AM hai. Early check-in room availability par depend karta hai."
  },
  {
    id: "faq_91",
    category: "Hinglish / Hindi Queries",
    question: "Couple allowed hai kya? (Are couples allowed?)",
    altQuestions: [
      "Unmarried couple aa sakte hain kya",
      "Ladka ladki stay kar sakte hain"
    ],
    keywords: ["couple", "allowed", "unmarried", "ladka", "ladki", "stay", "hai", "kya"],
    answer: "Haan ji! Hotel Jaipur Rajwada couple-friendly hai. Unmarried couples valid government photo ID (Aadhaar, DL, Passport) ke sath stay kar sakte hain."
  },
  {
    id: "faq_92",
    category: "Hinglish / Hindi Queries",
    question: "Location bhejo ya kidhar hai? (Send location / Where is it?)",
    altQuestions: [
      "Hotel kahan par hai",
      "Delhi jaipur highway par hai kya",
      "Address batao"
    ],
    keywords: ["location", "kahan", "kidhar", "address", "bhejo", "batao", "jaipur", "highway"],
    answer: "Hotel Jaipur Rajwada Delhi–Jaipur Highway (NH-11C), Syari, Talamod, Achrol, Rajasthan 303002 par hai. Direct highway road connectivity hai!"
  },
  {
    id: "faq_93",
    category: "Hinglish / Hindi Queries",
    question: "Khana aur breakfast milega kya? (Is food/breakfast available?)",
    altQuestions: [
      "Khane me kya milega",
      "Veg non veg khana hai kya"
    ],
    keywords: ["khana", "food", "breakfast", "restaurant", "milega", "veg", "nonveg", "nashta"],
    answer: "Haan ji! Hamare in-house restaurant me Veg aur Non-Veg Rajasthani Thali, North Indian dishes aur 24/7 room service milti hai."
  },
  {
    id: "faq_94",
    category: "Hinglish / Hindi Queries",
    question: "WhatsApp number kya hai? (What is WhatsApp number?)",
    altQuestions: [
      "WhatsApp par baat ho sakti hai",
      "Direct booking WhatsApp number"
    ],
    keywords: ["whatsapp", "number", "chat", "booking", "contact"],
    answer: "Hamara official WhatsApp number +91 78779 58308 hai. Aap direct chat karke room book kar sakte hain."
  },
  {
    id: "faq_95",
    category: "Hinglish / Hindi Queries",
    question: "Shadi ya birthday party ke liye hall hai? (Is banquet available for events?)",
    altQuestions: [
      "Marriage lawn hai kya",
      "Birthday party book karni hai"
    ],
    keywords: ["shadi", "shaadi", "birthday", "party", "hall", "lawn", "banquet", "booking"],
    answer: "Haan ji! Hamare paas Grand Banquet Hall aur Wedding Lawn available hai. Events booking ke liye call karein: +91 78779 58308."
  },
  {
    id: "faq_96",
    category: "Hinglish / Hindi Queries",
    question: "Swimming pool hai kya? (Is swimming pool available?)",
    altQuestions: [
      "Pool ka time kya hai",
      "Pool me naah sakte hain kya"
    ],
    keywords: ["swimming", "pool", "paani", "time", "hai", "kya"],
    answer: "Haan ji! Outdoor swimming pool subah 7:00 AM se shaam 7:00 PM tak hotel guests ke liye free accessible hai."
  },
  {
    id: "faq_97",
    category: "General Info",
    question: "What makes Hotel Jaipur Rajwada special?",
    altQuestions: [
      "Why choose Hotel Jaipur Rajwada?",
      "Hotel summary"
    ],
    keywords: ["special", "why", "unique", "rajwada", "luxury", "heritage"],
    answer: "Hotel Jaipur Rajwada blends royal Rajasthani heritage hospitality with modern 4-star comforts, highway convenience, lush lawns, exquisite dining, and couple-friendly warmth."
  },
  {
    id: "faq_98",
    category: "General Info",
    question: "Do you have a photo gallery of rooms and property?",
    altQuestions: [
      "Show room photos",
      "Hotel pics gallery"
    ],
    keywords: ["photo", "photos", "gallery", "pics", "pictures", "images"],
    answer: "Yes! Explore our Photo Gallery section on this website to view high-definition photos of rooms, suites, restaurant, pool, and wedding garden."
  },
  {
    id: "faq_99",
    category: "General Info",
    question: "Is luggage storage available after check-out?",
    altQuestions: [
      "Keep bags after check out",
      "Cloakroom facility"
    ],
    keywords: ["luggage", "bags", "storage", "cloakroom", "keep", "after"],
    answer: "Yes, we provide complimentary secure luggage storage at reception if you wish to explore Jaipur before departing."
  },
  {
    id: "faq_100",
    category: "General Info",
    question: "What should I do if I lose an item during my stay?",
    altQuestions: [
      "Lost and found policy",
      "Left my wallet/phone in room"
    ],
    keywords: ["lost", "found", "left", "forget", "item", "wallet", "phone"],
    answer: "Our Lost & Found desk safely catalogs forgotten belongings. Please contact reception at +91 78779 58308 immediately so we can ship it to you."
  }
];
