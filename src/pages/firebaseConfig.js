// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaMs5kILYwED7VslAI1NfRdi7KkMwy4S4",
  authDomain: "my-chillfilm-project.firebaseapp.com",
  projectId: "my-chillfilm-project",
  storageBucket: "my-chillfilm-project.firebasestorage.app",
  messagingSenderId: "433104130533",
  appId: "1:433104130533:web:e9b15f76becebb74971f0c",
  measurementId: "G-WS21NVB89M"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };