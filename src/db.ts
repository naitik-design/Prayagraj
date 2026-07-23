import fs from 'fs';
import path from 'path';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase.js';

const DB_FILE = path.join(process.cwd(), 'database.json');

const defaultData = {
  rooms: [
    { id: '1', name: 'Deluxe Heritage Room', price: 3500, discount: 0, type: 'Couples', available: true, featured: true, capacity: 2, amenities: ['Wifi', 'AC', 'Smart TV', 'Room Service'], images: ['/images/deluxe-heritage-room.jpg'] },
    { id: '2', name: 'Royal Rajwada Suite', price: 5500, discount: 0, type: 'Family', available: true, featured: true, capacity: 4, amenities: ['Wifi', 'AC', 'Mini Bar', 'Bathtub', 'Living Area'], images: ['/images/royal-rajwada-suite.jpg'] }
  ],
  bookings: [],
  content: {
    hero: { title: 'Hotel Jaipur Rajwada', subtitle: 'Experience the royal heritage and timeless elegance of Rajasthan.' },
    about: { text: 'Located in the serene surroundings of Achrol on the Delhi-Jaipur highway.' }
  },
  gallery: [
    '/images/deluxe-heritage-room.jpg',
    '/images/royal-rajwada-suite.jpg',
    '/images/hotel-exterior.jpg'
  ],
  attractions: [],
  settings: {
    hotelName: 'Hotel Jaipur Rajwada',
    phone: '+91 078779 58308',
    email: 'info@hoteljaipurrajwada.com',
    whatsapp: '+91 078779 58308',
    address: 'Syari, Talamod, Delhi–Jaipur Road, NH-11C, Achrol, Rajasthan 303002',
    chatbotEnabled: true,
    chatbotPrompt: 'You are the Jaipur Rajwada Concierge. You are a 24/7 polite, intelligent receptionist for Hotel Jaipur Rajwada. Understand and reply in English, Hindi, or mixed Hindi-English (Hinglish) as the user prefers.\n\nKey behaviors:\n- Greet guests warmly.\n- Answer questions regarding rooms, pricing, booking methods (online, walk-in, advance booking), check-in (12:00 PM) / check-out (11:00 AM) times, and cancellation policies.\n- Payment methods accepted: Cash, UPI, Credit/Debit cards. GST Invoice available.\n- ID Proof is mandatory (Aadhar/Passport/Voter ID). Foreigners need Passport & Valid Visa.\n- Food & Restaurant: We serve veg & non-veg options. Breakfast: 7:30 AM - 10:30 AM. Lunch & Dinner available. Room service is available 24/7.\n- Facilities: Free Wi-Fi, Parking, Lift, Power Backup, CCTV Security, Banquet Hall for weddings/events, Conference room.\n- Family/Kids: Kids under 5 stay free without extra bed. Extra bed is available for a fee.\n- Transport: Airport/Railway Station transfers and local sightseeing taxis can be arranged at the travel desk.\n- Nearby: We are located in Achrol. Suggest nearby landmarks based on the location.\n- Policies: Smoking allowed only in designated areas. No outside food allowed. Pets are not allowed.\n- Events: We host weddings, birthday parties, and corporate events. Please contact the hotel directly to arrange.\n- Emergency: Medical help and doctors on call are available.\n\nGuide users step by step if they wish to book. Suggest contacting the reception via Phone (+91 78779 58308) for special requests or if you do not know the answer. Never hallucinate fake information.'
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
      let updated = false;
      if (data.rooms) {
        data.rooms.forEach((r: any) => {
          if (r.id === '1' || r.name?.toLowerCase().includes('deluxe')) {
            r.name = 'Deluxe Heritage Room';
            r.images = ['/images/deluxe-heritage-room.jpg'];
            updated = true;
          }
          if (r.id === '2' || r.name?.toLowerCase().includes('royal') || r.name?.toLowerCase().includes('suite')) {
            r.name = 'Royal Rajwada Suite';
            r.images = ['/images/royal-rajwada-suite.jpg'];
            updated = true;
          }
        });
      }
      if (data.gallery) {
        data.gallery = ['/images/deluxe-heritage-room.jpg', '/images/royal-rajwada-suite.jpg', '/images/hotel-exterior.jpg'];
        updated = true;
      }
      if (updated) {
        await setDoc(docRef, data);
      }
      console.log('Database loaded and sanitized from Firestore.');
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
