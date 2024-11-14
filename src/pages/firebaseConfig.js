// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCaMs5kILYwED7VslAI1NfRdi7KkMwy4S4", 
    authDomain: "my-chillfilm-project",
    projectId: "my-chillfilm-project",
    storageBucket: "my-chillfilm-project",
    messagingSenderId: "433104130533",
    appId: "my-chillfilm-project",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };