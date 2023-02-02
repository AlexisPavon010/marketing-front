import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAKgI6qo7QVUIbZQvCy9aYwqjwluA2V2V0",
  authDomain: "marketing-aec9d.firebaseapp.com",
  projectId: "marketing-aec9d",
  storageBucket: "marketing-aec9d.appspot.com",
  messagingSenderId: "438234441712",
  appId: "1:438234441712:web:0708ac0de753af10835f35"
};

export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);
