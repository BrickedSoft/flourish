import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userTypes } from "../../assets/data/auth";

import { SignIn, SignUp, Form } from "../../types/FormTypes";

const initialState: Form = {
  signIn: {
    email: "",
    password: "",
  },
  signUp: {
    type: userTypes[0],
    email: "",
    password: "",
  },
};

/* ---------------------------------- SignIn --------------------------------- */
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setSignInData: (state, action: PayloadAction<SignIn>) => {
      state.signIn = action.payload;
    },
    setSignUpData: (state, action: PayloadAction<SignUp>) => {
      state.signUp = action.payload;
    },
  },
});

export default formSlice.reducer;
export const { setSignInData, setSignUpData } = formSlice.actions;
