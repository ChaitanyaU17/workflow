import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ShareToken, ShareState } from '../../type/type';

const initialState: ShareState = { tokens: [] };

const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    addToken(state, action: PayloadAction<ShareToken>) {
      state.tokens.push(action.payload);
    },
    revokeToken(state, action: PayloadAction<string>) {
      state.tokens = state.tokens.filter(t => t.token !== action.payload);
    },
  },
});

export const { addToken, revokeToken } = shareSlice.actions;
export default shareSlice.reducer;
