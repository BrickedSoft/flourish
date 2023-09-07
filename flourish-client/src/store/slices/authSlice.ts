import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../types/Status";
import { User } from "../../types/User";
import { signIn, signUp } from "../actions/authActions";

const initialState: User = {
  token: "",
  name: "",
  email: "",
  status: Status.IDLE,
};

const apiSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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

    builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = Status.FULFILLED;
      console.log(action);
      state.token = action.payload;
    });

    builder.addCase(signIn.rejected, (state) => {
      state.status = Status.REJECTED;
      state.token = "";
    });
  },
});

export default apiSlice.reducer;
