import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';

import { IUser } from '../interfaces/User';
import { FirebaseAuth, FirebaseDB } from './firebase';

export const registerUserWithEmailPassword = async ({ email, password, displayName }: IUser) => {

  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser!, { displayName });

    const docRef = doc(FirebaseDB, `users/${uid}`)

    setDoc(docRef, {
      uid,
      email,
      photoURL,
      displayName,
      role: 'user'
    })

    return {
      ok: true,
      uid,
      role: 'user',
      email,
      photoURL,
      displayName
    }

  } catch (error: any) {
    console.log(error);
    return { ok: false, errorMessage: error.message }
  }

}


export const loginWithEmailPassword = async ({ email, password }: IUser) => {

  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = resp.user;

    const docRef = doc(FirebaseDB, `users/${uid}`)
    const d = await getDoc(docRef)

    return {
      ok: true,
      // uid,
      // email,
      // photoURL,
      // displayName,
      ...d.data()
    }

  } catch (error: any) {
    return { ok: false, errorMessage: error.message }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
}
