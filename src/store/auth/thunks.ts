import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite';
import { FindUserToDb, saveUserToDb } from '../../helpers';
import { IUser } from '../../interfaces/User';
import { FirebaseDB } from '../../services/firebase';
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithFacebook, singInWithGoogle, singInWithMicrosoft } from '../../services/providers';
import { checkingCredentials, login, logout } from './authSlice';


export const checkingAuthentication = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
  }
}


export const startGoogleSignIn = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    const role = await FindUserToDb(result.uid!)

    if (!role) {
      await saveUserToDb(result)
      console.log('no existe el role')
    }

    dispatch(login({ ...result, role }))
  }
}

export const startFacebookSignIn = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());

    const result = await singInWithFacebook();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    const role = await FindUserToDb(result.uid!)

    if (!role) {
      await saveUserToDb(result)
      console.log('no existe el role')
    }

    dispatch(login({ ...result, role }))
  }
}


export const startMicrosoftSignIn = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());

    const result = await singInWithMicrosoft();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    const role = await FindUserToDb(result.uid!)

    if (!role) {
      await saveUserToDb(result)
      console.log('no existe el role')
    }

    dispatch(login({ ...result, role }))
  }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: IUser) => {
  return async (dispatch: any) => {

    dispatch(checkingCredentials());

    const result = await registerUserWithEmailPassword({ email, password, displayName });
    if (!result.ok) return dispatch(logout(result.errorMessage));

    const role = await FindUserToDb(result.uid!)

    if (!role) {
      await saveUserToDb(result)
      console.log('no existe el role')
    }

    dispatch(login({ ...result, role }))
  }

}


export const startLoginWithEmailPassword = ({ email, password }: IUser) => {
  return async (dispatch: any) => {

    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });
    if (!result.ok) return dispatch(logout(result));

    const role = await FindUserToDb(result.uid!)

    if (!role) {
      await saveUserToDb(result)
      console.log('no existe el role')
    }

    dispatch(login({ ...result, role }));
  }
}


export const startLogout = () => {
  return async (dispatch: any) => {

    await logoutFirebase();

    dispatch(logout({}));
  }
}