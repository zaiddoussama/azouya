import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD_QJZrQapt3fIdoBki1awhaDAMhiH7pis",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nile-d301e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nile-d301e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nile-d301e.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "132457023610",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:132457023610:web:5d9efe188cddc387b713c3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-CZ0LDM4EXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
