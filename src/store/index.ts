import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import catalogReducer from './catalog/catalogSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    catalog: catalogReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
