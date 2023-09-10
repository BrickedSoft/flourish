import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { Flags } from "../../types/Flags";
import { PURGE } from "redux-persist";

const initialState: Flags = {
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
        state[key as keyof Flags] = value;
      });
    });
  },
});

export default flagSlice.reducer;
export const { setIsSignedIn } = flagSlice.actions;
export const { name } = flagSlice;
