import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDi1bw8MjAt6Pia3Fcm835TfN7MBo4b0i4",
  authDomain: "marketing-app-9895f.firebaseapp.com",
  projectId: "marketing-app-9895f",
  storageBucket: "marketing-app-9895f.appspot.com",
  messagingSenderId: "678403164562",
  appId: "1:678403164562:web:26c6ef908eb936c08cd94b"
};

export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);
