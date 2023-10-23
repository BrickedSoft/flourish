import { createAsyncThunk } from "@reduxjs/toolkit";

import { postRegistrationForm } from "../../api/apiForm";
import { RegistrationFormTypes } from "../../types/RegistrationForm";

export const submitForm = createAsyncThunk(
  "registrationForm/postRegistrationForm",
  async (data: RegistrationFormTypes) => {
    return await postRegistrationForm(data);
  }
);
