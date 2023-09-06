import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Loading } from "../../types/Loading";
import { User, userTypes } from "../../types/User";
import { signIn, signUp } from "../actions/authActions";

const initialState: User = {
  token: "",
  type: userTypes.CLIENT,
  name: "",
  email: "",
  loading: Loading.IDLE,
};

const apiSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* --------------------------------- Sign Up -------------------------------- */

    builder.addCase(signUp.pending, (state) => {
      state.loading = Loading.PENDING;
    });

    builder.addCase(signUp.fulfilled, (state) => {
      state.loading = Loading.FULFILLED;
    });

    builder.addCase(signUp.rejected, (state) => {
      state.loading = Loading.REJECTED;
    });

    /* --------------------------------- Sign In -------------------------------- */

    builder.addCase(signIn.pending, (state) => {
      state.loading = Loading.PENDING;
    });

    builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = Loading.FULFILLED;
      console.log(action);
      state.token = action.payload;
    });

    builder.addCase(signIn.rejected, (state) => {
      state.loading = Loading.REJECTED;
      state.token = "";
    });
  },
});

export default apiSlice.reducer;
