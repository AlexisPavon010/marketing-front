import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBDWcCtUab9Ev33lSf-TkgM9xUNOZtxxcI",
  authDomain: "marketing-badbf.firebaseapp.com",
  projectId: "marketing-badbf",
  storageBucket: "marketing-badbf.appspot.com",
  messagingSenderId: "851900811468",
  appId: "1:851900811468:web:fd339eefb64076628f9a69"
};

export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);
