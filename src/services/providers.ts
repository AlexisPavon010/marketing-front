import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { IUser } from '../interfaces/User';
import { FirebaseAuth } from './firebase';


const googleProvider = new GoogleAuthProvider();
const facebookProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');


export const singInWithGoogle = async () => {

  try {

    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      uid,
      email,
      photoURL,
      displayName
    }


  } catch (error: any) {

    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    }
  }

}

export const singInWithFacebook = async () => {

  try {

    const result = await signInWithPopup(FirebaseAuth, facebookProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      uid,
      email,
      photoURL,
      displayName
    }


  } catch (error: any) {

    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    }
  }

}

export const singInWithMicrosoft = async () => {

  try {

    const result = await signInWithPopup(FirebaseAuth, microsoftProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      uid,
      email,
      photoURL,
      displayName
    }


  } catch (error: any) {

    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    }
  }

}


export const registerUserWithEmailPassword = async ({ email, password, displayName }: IUser) => {

  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser!, { displayName });

    return {
      ok: true,
      uid,
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

    return {
      ok: true,
      uid,
      email,
      photoURL,
      displayName
    }

  } catch (error: any) {
    return { ok: false, errorMessage: error.message }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
}
