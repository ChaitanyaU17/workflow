import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import { combineReducers, type Action } from 'redux';

import workflowsReducer from '../features/store/workflowsSlice';
import formsReducer from '../features/store/formsSlice';
import sessionsReducer from '../features/store/sessionsSlice';
import shareReducer from '../features/store/shareSlice';
import authReducer from '../features/store/authSlice';
import adminsReducer from '../features/store/adminsSlice'
import blogsReducer from '../features/store/blogSlice';
import { seedWorkflows } from '../features/store/workflowsSlice';
import { seedForms } from '../features/store/formsSlice';

const storage = {
  getItem: (key: string): Promise<string | null> => {
    try { return Promise.resolve(localStorage.getItem(key)); }
    catch { return Promise.resolve(null); }
  },
  setItem: (key: string, value: string): Promise<void> => {
    try { localStorage.setItem(key, value); } catch {}
    return Promise.resolve();
  },
  removeItem: (key: string): Promise<void> => {
    try { localStorage.removeItem(key); } catch {}
    return Promise.resolve();
  },
};

const combinedReducer = combineReducers({
  workflows: workflowsReducer,
  forms: formsReducer,
  sessions: sessionsReducer,
  share: shareReducer,
  auth: authReducer,
  admins: adminsReducer,
  blogs: blogsReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer = (state: RootState | undefined, action: Action): RootState => {
  const newState = combinedReducer(state, action);

  if (action.type === REHYDRATE) {
    const payload = (action as any).payload as Partial<RootState> | undefined;
    if (!payload) return newState;

    const persistedWorkflows = payload.workflows?.workflows ?? [];
    const mergedWorkflows = [
      ...seedWorkflows,
      ...persistedWorkflows.filter(w => !seedWorkflows.some(s => s.id === w.id)),
    ];

    const persistedForms = payload.forms?.forms ?? [];
    const mergedForms = [
      ...seedForms,
      ...persistedForms.filter(f => !seedForms.some(s => s.id === f.id)),
    ];

    return {
      ...newState,
      workflows: { workflows: mergedWorkflows },
      forms: { forms: mergedForms },
      sessions: payload.sessions ?? { sessions: [] },
      share: payload.share ?? { tokens: [] },
      auth: payload.auth ?? {currentUser: null, isAuthenticated: false, loginError: null},
      admins: payload.admins ?? {admins: []},
      blogs: payload.blogs ?? {blogs: []},
    };
  }

  return newState;
};

const persistConfig = {
  key: 'onboarding-app-v6',
  version: 6,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;