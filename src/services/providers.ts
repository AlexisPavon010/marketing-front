import { login, register } from '../api/auth';

import { IUser } from '../interfaces/User';

export const registerUserWithEmailPassword = async ({ email, password, username }: IUser) => {

  try {
    const { data } = await register({ email, password, username });

    return {
      ok: true,
      ...data
    }

  } catch (error: any) {
    console.log(error.response.data.message)
    const message = Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message

    return { ok: false, registerMessage: message }
  }

}


export const loginWithEmailPassword = async ({ email, password }: IUser) => {

  try {
    const { data } = await login({ email, password });

    return {
      ok: true,
      ...data
    }

  } catch (error: any) {
    console.log(error.response.data.message)
    const message = Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message
    return { ok: false, loginMessage: message }
  }
}