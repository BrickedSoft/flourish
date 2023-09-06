import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.name]: apiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
