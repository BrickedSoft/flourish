import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { FlagTypes } from "../../types/Flag";
import { PURGE } from "redux-persist";

const initialState: FlagTypes = {
  isSignedIn: false,
};

const flagSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    setIsSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, (state) => {
      _.mapKeys(initialState, (value, key) => {
        state[key as keyof FlagTypes] = value;
      });
    });
  },
});

export default flagSlice.reducer;
export const { setIsSignedIn } = flagSlice.actions;
export const { name } = flagSlice;
