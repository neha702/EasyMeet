
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCq_zybC0_s_FqEEl03zaaVHbH7HkFB_mo",
  authDomain: "easymeet-chat.firebaseapp.com",
  projectId: "easymeet-chat",
  storageBucket: "easymeet-chat.appspot.com",
  messagingSenderId: "96885726960",
  appId: "1:96885726960:web:3cc92276a55f90067b6c35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth();