import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// These are placeholder credentials - USER should replace with their own in .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKey",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fasal-rakshak.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fasal-rakshak",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fasal-rakshak.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdefgh"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
