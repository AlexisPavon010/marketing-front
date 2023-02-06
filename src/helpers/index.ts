import { doc, updateDoc } from "firebase/firestore/lite";

import { FirebaseDB } from "../services/firebase";

export const updateRole = async (docId: string, newRole: string) => {
  const docRef = doc(FirebaseDB, "users", docId);
  await updateDoc(docRef, {
    role: newRole
  })
}