import { IUser } from '../../interfaces/User';
import {
  loginWithEmailPassword,
  registerUserWithEmailPassword,
} from '../../services/providers';
import { checkingCredentials, login, logout } from './authSlice';


export const checkingAuthentication = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, username }: IUser) => {
  return async (dispatch: any) => {

    dispatch(checkingCredentials());

    const result = await registerUserWithEmailPassword({ email, password, username });
    if (!result.ok) return dispatch(logout(result));


    dispatch(login({ ...result }))
  }

}


export const startLoginWithEmailPassword = ({ email, password }: IUser) => {
  return async (dispatch: any) => {

    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });
    if (!result.ok) return dispatch(logout(result));

    dispatch(login({ ...result }));
  }
}


export const startLogout = () => {
  return async (dispatch: any) => {

    dispatch(logout({}));
  }
}