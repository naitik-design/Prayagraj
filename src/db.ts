import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'database.json');

const defaultData = {
  rooms: [
    { id: '1', name: 'Deluxe Room', price: 2500, discount: 0, type: 'Couples', available: true, featured: true, capacity: 2, amenities: ['Wifi', 'AC'], images: ['/images/deluxe_room_1783739111901.jpg'] },
    { id: '2', name: 'Family Suite', price: 4500, discount: 0, type: 'Family', available: true, featured: false, capacity: 4, amenities: ['Wifi', 'AC', 'Kitchen'], images: ['/images/family_suite_1783739124830.jpg'] }
  ],
  bookings: [],
  content: {
    hero: { title: 'Hotel Prayagraj', subtitle: 'A premium sanctuary blending modern comfort with traditional Rajasthani warmth.' },
    about: { text: 'Located near the holy Khatu Shyam Ji Temple.' }
  },
  gallery: [],
  attractions: [],
  settings: {
    hotelName: 'Hotel Prayagraj',
    phone: '+91 75971 17839',
    email: 'info@prayagrajhotel.com',
    whatsapp: '+91 75971 17839',
    address: '2–3 Shree Shyam Vihar Colony, Reengus, Rajasthan 332404',
    chatbotEnabled: true,
    chatbotPrompt: 'You are Prayagraj Concierge...'
  },
  conversations: []
};

let data: any = null;

export function loadDb() {
  if (data) return data;
  try {
    if (fs.existsSync(DB_FILE)) {
      const fileData = fs.readFileSync(DB_FILE, 'utf8');
      data = JSON.parse(fileData);
    } else {
      data = { ...defaultData };
      saveDb();
    }
  } catch (e) {
    console.error('Error loading db', e);
    data = { ...defaultData };
  }
  return data;
}

export function saveDb() {
  if (data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  }
}

export function getDb() {
  return loadDb();
}
