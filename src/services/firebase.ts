import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCCZ1JcR474982FrlduXTVO7q74cHZnor8",
  authDomain: "dashboard-lagom.firebaseapp.com",
  projectId: "dashboard-lagom",
  storageBucket: "dashboard-lagom.appspot.com",
  messagingSenderId: "460736580067",
  appId: "1:460736580067:web:2a0eddce984a44d88038d6"
};

export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );
