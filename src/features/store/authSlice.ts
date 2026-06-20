import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'superadmin' | 'admin';

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  name: string;
  adminId?: string;
}

interface AuthState {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  loginError: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  loginError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loginError = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loginError = action.payload;
    },
    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loginError = null;
    },
    clearLoginError(state) {
      state.loginError = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout, clearLoginError } = authSlice.actions;
export default authSlice.reducer;