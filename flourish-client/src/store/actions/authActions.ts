import { createAsyncThunk } from "@reduxjs/toolkit";

import { SignIn, SignUp } from "../../types/Form";
import { apiSignUp } from "../../api/apiSignUp";
import { apiSignIn } from "../../api/apiSignIn";

export const signUp = createAsyncThunk(
  "flourish/signUp",
  async (data: SignUp) => {
    return await apiSignUp(data);
  }
);

export const signIn = createAsyncThunk(
  "flourish/signIn",
  async (data: SignIn) => {
    return await apiSignIn(data);
  }
);
