import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDqjV4OzQXadUsNAV3uQ2g_cVNCNaUwEgM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "second-shutter-web.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "second-shutter-web",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "second-shutter-web.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "630526823498",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:630526823498:web:c8de4c1a4484aa55562ab3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-P801L6KKYP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged };
