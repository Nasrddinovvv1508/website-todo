// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBI8oLZYUJv7FLhOtORROsHNmOuhEqPZfg",
    authDomain: "todos-d5f6d.firebaseapp.com",
    projectId: "todos-d5f6d",
    storageBucket: "todos-d5f6d.appspot.com",
    messagingSenderId: "219401280455",
    appId: "1:219401280455:web:e6d97df2eb9914019457e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export let auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);