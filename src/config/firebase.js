import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config from environment variables
// Note: These are CLIENT keys - they are PUBLIC by design and safe to expose
// Only Firebase ADMIN service account keys (backend) need to be kept secret
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB1bKzu6Jbth5-9Nf8jqfX2Zt4ThYVU_Go",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "jobs-project-5ecac.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "jobs-project-5ecac",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "jobs-project-5ecac.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "25341383952",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:25341383952:web:cd286de1ac070b89e94195",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-8ZSL50E6Q6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
