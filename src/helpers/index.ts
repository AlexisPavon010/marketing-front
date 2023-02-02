import { collection, doc, getDocs, setDoc, updateDoc, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../services/firebase";

export const FindUserToDb = async (uid: string) => {
  const usersCollectionRef = query(collection(FirebaseDB, 'users'), where("uid", "==", uid));
  const docs = await getDocs(usersCollectionRef);

  const user: any = [];
  docs.forEach(doc => {
    user.push({ id: doc.id, ...doc.data() });
  });

  if (user.length == 0) return null
  console.log(user[0].role)

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

export const updateRole = async (docId: string, newRole: string) => {
  const docRef = doc(FirebaseDB, "users", docId);
  await updateDoc(docRef, {
    role: newRole
  })
}

export const saveUserToDb = async ({ uid, email, displayName }: any) => {
  const newDoc = doc(collection(FirebaseDB, 'users'));
  await setDoc(newDoc, {
    docId: newDoc.id,
    uid: uid,
    role: 'user',
    email: email,
    username: displayName
  });
}