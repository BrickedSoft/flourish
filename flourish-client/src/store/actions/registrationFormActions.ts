import { createAsyncThunk } from "@reduxjs/toolkit";

import { postRegistrationForm } from "../../api/apiForm";
import { RegistrationForm } from "../../types/RegistrationForm";

export const submitForm = createAsyncThunk(
  "registrationForm/postRegistrationForm",
  async (data: RegistrationForm) => {
    return await postRegistrationForm(data);
  }
);
