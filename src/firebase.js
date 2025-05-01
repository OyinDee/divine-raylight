import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuiNoeIfXwhsAtRRc60h9qEjeRCgEXsdk",
  authDomain: "drlc-61079.firebaseapp.com",
  projectId: "drlc-61079",
  storageBucket: "drlc-61079.firebasestorage.app",
  messagingSenderId: "317096811850",
  appId: "1:317096811850:web:16e817bc23db1aad0b75b3",
  measurementId: "G-SEEB8JLZ9E"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
