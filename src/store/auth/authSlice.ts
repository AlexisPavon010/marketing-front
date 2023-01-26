import { createSlice } from '@reduxjs/toolkit';

interface AuthSliceProps {
  status: 'checking' | 'not-authenticated' | 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage?: null,
}

const userData: AuthSliceProps = JSON.parse(localStorage.getItem('user')!) || {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: userData,
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;
      localStorage.removeItem('user')
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;