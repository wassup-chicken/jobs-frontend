import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1bKzu6Jbth5-9Nf8jqfX2Zt4ThYVU_Go",
  authDomain: "jobs-project-5ecac.firebaseapp.com",
  projectId: "jobs-project-5ecac",
  storageBucket: "jobs-project-5ecac.firebasestorage.app",
  messagingSenderId: "25341383952",
  appId: "1:25341383952:web:cd286de1ac070b89e94195",
  measurementId: "G-8ZSL50E6Q6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
