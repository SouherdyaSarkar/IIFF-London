import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEZ5tIEUkKoTmMaLrSaALPvHjZb1r2yVY",
  authDomain: "film-festival-dcf1b.firebaseapp.com",
  projectId: "film-festival-dcf1b",
  storageBucket: "film-festival-dcf1b.firebasestorage.app",
  messagingSenderId: "523215700577",
  appId: "1:523215700577:web:7b7a55a6185b19c15ee020",
  measurementId: "G-DPFB6KN5BX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };