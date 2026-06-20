import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AdminAccount {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  createdBy: 'superadmin';
}

interface AdminsState {
  admins: AdminAccount[];
}

const initialState: AdminsState = {
  admins: [],
};

const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    addAdmin(state, action: PayloadAction<AdminAccount>) {
      const exists = state.admins.some(
        a => a.username.toLowerCase() === action.payload.username.toLowerCase()
      );
      if (!exists) state.admins.push(action.payload);
    },
    updateAdmin(state, action: PayloadAction<AdminAccount>) {
      const idx = state.admins.findIndex(a => a.id === action.payload.id);
      if (idx !== -1) state.admins[idx] = action.payload;
    },
    toggleAdminStatus(state, action: PayloadAction<string>) {
      const admin = state.admins.find(a => a.id === action.payload);
      if (admin) admin.isActive = !admin.isActive;
    },
    deleteAdmin(state, action: PayloadAction<string>) {
      state.admins = state.admins.filter(a => a.id !== action.payload);
    },
    resetAdminPassword(
      state,
      action: PayloadAction<{ id: string; newPassword: string }>
    ) {
      const admin = state.admins.find(a => a.id === action.payload.id);
      if (admin) admin.password = action.payload.newPassword;
    },
  },
});

export const {
  addAdmin, updateAdmin, toggleAdminStatus,
  deleteAdmin, resetAdminPassword,
} = adminsSlice.actions;

export default adminsSlice.reducer;