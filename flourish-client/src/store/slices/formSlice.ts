import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userTypes } from "../../assets/data/signup";

import { Login, Signup, Form } from "../../types/FormTypes";

const initialState: Form = {
  login: {
    email: "",
    password: "",
  },
  signup: {
    type: userTypes[0],
    email: "",
    password: "",
  },
};

/* ---------------------------------- Login --------------------------------- */
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setLoginData: (state, action: PayloadAction<Login>) => {
      state.login = action.payload;
    },
    setSignupData: (state, action: PayloadAction<Signup>) => {
      state.signup = action.payload;
    },
  },
});

export default formSlice.reducer;
export const { setLoginData, setSignupData } = formSlice.actions;
