import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp({
  projectId: config.projectId,
  credential: applicationDefault()
});

const db = getFirestore(app, config.firestoreDatabaseId);

async function test() {
  try {
    const docRef = await db.collection('test').add({ name: 'test-admin' });
    console.log('Doc written:', docRef.id);
    const snap = await db.collection('test').get();
    console.log('Docs read:', snap.docs.length);
    process.exit(0);
  } catch (e) {
    console.error('Error:', e);
    process.exit(1);
  }
}
test();
