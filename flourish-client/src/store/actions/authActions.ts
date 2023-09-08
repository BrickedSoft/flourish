import { createAsyncThunk } from "@reduxjs/toolkit";

import { SignIn, SignUp } from "../../types/Form";
import { apiSignUp } from "../../api/apiAuth";
import { apiSignIn } from "../../api/apiAuth";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data: SignUp) => {
    return await apiSignUp(data);
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data: SignIn) => {
    return await apiSignIn(data);
  }
);
