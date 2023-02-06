import { IUser } from '../../interfaces/User';
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
} from '../../services/providers';
import { checkingCredentials, login, logout } from './authSlice';


export const checkingAuthentication = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: IUser) => {
  return async (dispatch: any) => {

    dispatch(checkingCredentials());

    const result = await registerUserWithEmailPassword({ email, password, displayName });
    if (!result.ok) return dispatch(logout(result.errorMessage));

    // const role = await FindUserToDb(result.uid!)

    // if (!role) {
    //   await saveUserToDb(result)
    //   console.log('no existe el role')
    // }

    dispatch(login({ ...result }))
  }

}


export const startLoginWithEmailPassword = ({ email, password }: IUser) => {
  return async (dispatch: any) => {

    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });
    if (!result.ok) return dispatch(logout(result));

    // const role = await FindUserToDb(result.uid!)

    // if (!role) {
    //   await saveUserToDb(result)
    //   console.log('no existe el role')
    // }

    dispatch(login({ ...result }));
  }
}


export const startLogout = () => {
  return async (dispatch: any) => {

    await logoutFirebase();

    dispatch(logout({}));
  }
}