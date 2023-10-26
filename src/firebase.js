import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_gSxWwqLoMoaTlBw7Ym5muT2-jmHPiCE",
  authDomain: "chess-4.firebaseapp.com",
  projectId: "chess-4",
  storageBucket: "chess-4.appspot.com",
  messagingSenderId: "850708688114",
  appId: "1:850708688114:web:ea0129fa50cea4d2c8b46b",
  measurementId: "G-DDFE1VEJF2"
};
// Initialize Firebase
const appfirebase = initializeApp(firebaseConfig);

export const db = getFirestore(appfirebase);
export const auth = getAuth(appfirebase);
export default appfirebase;

