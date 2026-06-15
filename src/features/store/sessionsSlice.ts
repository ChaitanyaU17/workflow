import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ConsumerSession, SessionsState } from '../../type/type';

const initialState: SessionsState = { sessions: [] };

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    createSession(state, action: PayloadAction<ConsumerSession>) {
      const existing = state.sessions.findIndex(
        s => s.workflowId === action.payload.workflowId && s.consumerId === action.payload.consumerId && s.status === 'in-progress'
      );
      if (existing === -1) {
        state.sessions.push(action.payload);
      }
    },
    upsertSession(state, action: PayloadAction<ConsumerSession>) {
      const idx = state.sessions.findIndex(s => s.sessionId === action.payload.sessionId);
      if (idx !== -1) {
        state.sessions[idx] = { ...action.payload, updatedAt: new Date().toISOString() };
      } else {
        state.sessions.push(action.payload);
      }
    },
    saveNodeValues(
      state,
      action: PayloadAction<{ sessionId: string; nodeId: string; values: Record<string, unknown> }>
    ) {
      const s = state.sessions.find(s => s.sessionId === action.payload.sessionId);
      if (s) {
        s.valuesByNodeId[action.payload.nodeId] = action.payload.values;
        s.updatedAt = new Date().toISOString();
      }
    },
    advanceNode(state, action: PayloadAction<{ sessionId: string; completedNodeId: string; nextNodeId: string }>) {
      const s = state.sessions.find(s => s.sessionId === action.payload.sessionId);
      if (s) {
        if (!s.completedNodeIds.includes(action.payload.completedNodeId)) {
          s.completedNodeIds.push(action.payload.completedNodeId);
        }
        s.currentNodeId = action.payload.nextNodeId;
        s.updatedAt = new Date().toISOString();
      }
    },
    completeSession(state, action: PayloadAction<string>) {
      const s = state.sessions.find(s => s.sessionId === action.payload);
      if (s) {
        s.status = 'completed';
        s.updatedAt = new Date().toISOString();
      }
    },
    deleteSession(state, action: PayloadAction<string>) {
      state.sessions = state.sessions.filter(s => s.sessionId !== action.payload);
    },
  },
});

export const { createSession, upsertSession, saveNodeValues, advanceNode, completeSession, deleteSession } =
  sessionsSlice.actions;
export default sessionsSlice.reducer;
