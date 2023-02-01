import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore/lite";
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

export const findAllUsersToDb = async () => {
  const usersCollectionRef = collection(FirebaseDB, 'users');
  const docs = await getDocs(usersCollectionRef);

  const users: any = [];
  docs.forEach(doc => {
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
}

export const handleChangeRole = async (uid: string, newRole: string) => {
  const newDoc = doc(collection(FirebaseDB, `users/${uid}/roles`));
  await updateDoc(newDoc, {
    role: newRole
  })
}

export const saveUserToDb = async ({ uid, email, displayName }: any) => {
  const newDoc = doc(collection(FirebaseDB, `users/${uid}/roles`));
  await setDoc(newDoc, {
    role: 'client',
    email: email,
    username: displayName
  });
}