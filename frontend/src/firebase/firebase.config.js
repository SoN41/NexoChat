// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0T_MkRIotf-o48OKfjczhz6hYks6FNno",
  authDomain: "social-media-212a7.firebaseapp.com",
  databaseURL: "https://social-media-212a7-default-rtdb.firebaseio.com",
  projectId: "social-media-212a7",
  storageBucket: "social-media-212a7.firebasestorage.app",
  messagingSenderId: "652756039112",
  appId: "1:652756039112:web:37f0da22cc89d761f9fcfd",
  measurementId: "G-Z2DNJY2E60"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Initialize provider
export const db = getFirestore(app);
export default app;