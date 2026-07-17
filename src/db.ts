import fs from 'fs';
import path from 'path';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase.js';

const DB_FILE = path.join(process.cwd(), 'database.json');

const defaultData = {
  rooms: [
    { id: '1', name: 'Deluxe Room', price: 2500, discount: 0, type: 'Couples', available: true, featured: true, capacity: 2, amenities: ['Wifi', 'AC'], images: ['/images/deluxe_room_1783739111901.jpg'] },
    { id: '2', name: 'Family Suite', price: 4500, discount: 0, type: 'Family', available: true, featured: false, capacity: 4, amenities: ['Wifi', 'AC', 'Kitchen'], images: ['/images/family_suite_1783739124830.jpg'] }
  ],
  bookings: [],
  content: {
    hero: { title: 'Hotel Jaipur Rajwada', subtitle: 'Experience the royal heritage and timeless elegance of Rajasthan.' },
    about: { text: 'Located in the serene surroundings of Achrol on the Delhi-Jaipur highway.' }
  },
  gallery: [],
  attractions: [],
  settings: {
    hotelName: 'Hotel Jaipur Rajwada',
    phone: '+91 078779 58308',
    email: 'info@hoteljaipurrajwada.com',
    whatsapp: '+91 078779 58308',
    address: 'Syari, Talamod, Delhi–Jaipur Road, NH-11C, Achrol, Rajasthan 303002',
    chatbotEnabled: true,
    chatbotPrompt: 'You are Jaipur Rajwada Concierge...'
  },
  conversations: []
};

let data: any = null;

export async function initDb() {
  try {
    const docRef = doc(db, 'hotel_app', 'database');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      data = docSnap.data();
      console.log('Database loaded successfully from Firestore.');
      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
      } catch (e) {
        // Safe to ignore in read-only filesystems
      }
    } else {
      console.log('No database found in Firestore. Seeding default data...');
      data = { ...defaultData };
      await setDoc(docRef, data);
      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
      } catch (e) {}
    }
  } catch (error) {
    console.warn('Failed to load database from Firestore, falling back to local file:', error);
    loadDb();
  }
}

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
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    } catch (e) {
      // Safe to ignore in read-only filesystems
    }
    
    // Asynchronously save to Firestore to avoid blocking Express responses
    const docRef = doc(db, 'hotel_app', 'database');
    setDoc(docRef, data).then(() => {
      console.log('Database updated in Firestore.');
    }).catch(err => {
      console.error('Failed to update database in Firestore:', err);
    });
  }
}

export function getDb() {
  return loadDb();
}
