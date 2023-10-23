import { createAsyncThunk } from "@reduxjs/toolkit";

import { SignInTypes, SignUpTypes } from "../../types/Form";
import { apiSignUp } from "../../api/apiAuth";
import { apiSignIn } from "../../api/apiAuth";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data: SignUpTypes) => {
    return await apiSignUp(data);
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data: SignInTypes) => {
    return await apiSignIn(data);
  }
);
