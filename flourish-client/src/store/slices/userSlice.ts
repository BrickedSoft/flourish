import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { Status } from "../../types/Status";
import { User } from "../../types/User";
import { signIn, signUp } from "../actions/authActions";

const initialState: User = {
  token: "",
  name: "",
  email: "",
  status: Status.IDLE,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    purgeUser: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    /* --------------------------------- Sign Up -------------------------------- */

    builder.addCase(signUp.pending, (state) => {
      state.status = Status.PENDING;
    });

    builder.addCase(signUp.fulfilled, (state) => {
      state.status = Status.FULFILLED;
    });

    builder.addCase(signUp.rejected, (state) => {
      state.status = Status.REJECTED;
    });

    /* --------------------------------- Sign In -------------------------------- */

    builder.addCase(signIn.pending, (state) => {
      state.status = Status.PENDING;
    });

    builder.addCase(
      signIn.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.status = Status.FULFILLED;
        state.token = action.payload;
      }
    );

    builder.addCase(signIn.rejected, (state) => {
      state.status = Status.REJECTED;
      state.token = "";
    });

    /* ---------------------------------- PURGE --------------------------------- */

    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export default userSlice.reducer;
export const { purgeUser } = userSlice.actions;
export const { name } = userSlice;
