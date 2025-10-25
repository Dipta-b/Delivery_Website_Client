// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmZ0MfiCJKIY09lKYcpxE7UOViP20xsIc",
  authDomain: "delivery-website-4de74.firebaseapp.com",
  projectId: "delivery-website-4de74",
  storageBucket: "delivery-website-4de74.firebasestorage.app",
  messagingSenderId: "777959777115",
  appId: "1:777959777115:web:f608a9ec7e340753d7707e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;