import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Login {
  email: string;
  password: string;
}

interface Form {
  login: Login;
}

const initialState: Form = {
  login: {
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
  },
});

export default formSlice.reducer;
export const { setLoginData } = formSlice.actions;
