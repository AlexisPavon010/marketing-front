import { createSlice } from '@reduxjs/toolkit';

interface AuthSliceProps {
  status: 'checking' | 'not-authenticated' | 'authenticated'
  uid: null,
  email: null,
  username: null,
  loginMessage?: null,
  registerMessage?: null,
  role: 'admin' | 'user' | 'jury' | null
}

const userData: AuthSliceProps = JSON.parse(localStorage.getItem('user')!) || {
  status: 'not-authenticated',
  uid: null,
  email: null,
  username: null,
  photoURL: null,
  loginMessage: null,
  registerMessage: null,
  role: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: userData,
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload._id;
      state.email = payload.email;
      state.username = payload.username;
      state.loginMessage = null;
      state.registerMessage = null;
      state.role = payload.role;
      // localStorage.setItem('user', JSON.stringify(payload))
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.username = null;
      state.loginMessage = payload?.loginMessage;
      state.registerMessage = payload?.registerMessage;
      state.role = null;
      localStorage.removeItem('user')
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;