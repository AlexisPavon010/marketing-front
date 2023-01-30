import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../services/firebase";

export const FindUserToDb = async (uid: string) => {
  const collectionRef = collection(FirebaseDB, `users/${uid}/roles`);
  const docs = await getDocs(collectionRef);

  const user: any = [];
  docs.forEach(doc => {
    user.push({ id: doc.id, ...doc.data() });
  });

  if (user.length == 0) return null

  return user[0]?.role;
}

export const saveUserToDb = async (uid: string) => {
  const newDoc = doc(collection(FirebaseDB, `users/${uid}/roles`));
  await setDoc(newDoc, {
    role: 'client'
  });
}