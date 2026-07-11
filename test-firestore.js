import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function test() {
  try {
    const docRef = await addDoc(collection(db, 'test'), { name: 'test' });
    console.log('Doc written:', docRef.id);
    const snap = await getDocs(collection(db, 'test'));
    console.log('Docs read:', snap.docs.length);
    process.exit(0);
  } catch (e) {
    console.error('Error:', e);
    process.exit(1);
  }
}
test();
