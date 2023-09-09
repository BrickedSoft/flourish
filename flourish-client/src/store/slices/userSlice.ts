import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { Status } from "../../types/Status";
import { User } from "../../types/User";
import { signIn, signUp } from "../actions/authActions";

interface reducerType extends User {
  status: Status;
}

const initialState: reducerType = {
  token: "",
  email: "",
  name: "",
  adminCounselor: "",
  counselor: "",
  client: "",
  status: Status.IDLE,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    purgeUser: (state) => {
      state.email = "";
      state.token = "";
      state.name = "";
      state.status = Status.IDLE;
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

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.adminCounselor = action.payload.adminCounselor;
      state.counselor = action.payload.counselor;
      state.client = action.payload.client;
      state.status = Status.FULFILLED;
    });

    builder.addCase(signIn.rejected, (state) => {
      state = { ...initialState };
      state.status = Status.REJECTED;
    });

    /* ---------------------------------- PURGE --------------------------------- */

    builder.addCase(PURGE, (state) => {
      state.email = "";
      state.token = "";
      state.name = "";
      state.status = Status.IDLE;
    });
  },
});

export default userSlice.reducer;
export const { purgeUser } = userSlice.actions;
export const { name } = userSlice;
