import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import flagSlice, { name as flagSliceName } from "./slices/flagSlice";
import questionnaireSlice, {
  name as questionnaireSliceName,
} from "./slices/questionnaireSlice";
import userSlice, { name as userSliceName } from "./slices/userSlice";

const persistConfig = {
  key: "flourish",
  storage,
};

const rootReducer = combineReducers({
  [userSliceName]: userSlice,
  [flagSliceName]: flagSlice,
  [questionnaireSliceName]: questionnaireSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
