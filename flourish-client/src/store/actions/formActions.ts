import { createAsyncThunk } from "@reduxjs/toolkit";

import { getRegistrationForm, postRegistrationForm } from "../../api/apiForm";
import { RegistrationForm } from "../../types/RegistrationForm";

export const fetchRegistrationForm = createAsyncThunk(
  "registrationForm/getRegistrationForm",
  async () => {
    return await getRegistrationForm();
  }
);

export const submitRegistrationForm = createAsyncThunk(
  "registrationForm/postRegistrationForm",
  async (data: RegistrationForm) => {
    return await postRegistrationForm(data);
  }
);
