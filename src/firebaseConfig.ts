import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };
// console.log(firebaseConfig);
const firebaseConfig = {
  apiKey: 'AIzaSyAXjW1bXI01IWdMju2CK-7gpNCaxvdAArw',
  authDomain: 'movies-9d73e.firebaseapp.com',
  projectId: 'movies-9d73e',
  storageBucket: 'movies-9d73e.appspot.com',
  messagingSenderId: '168833224135',
  appId: '1:168833224135:web:dd4bb08c51a4329d3d1de2',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };
