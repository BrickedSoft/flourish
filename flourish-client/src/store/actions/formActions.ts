import { createAsyncThunk } from "@reduxjs/toolkit";

import { getRegistrationForm, postRegistrationForm } from "../../api/apiForm";
import { RegistrationFormTypes } from "../../types/RegistrationForm";

export const fetchRegistrationForm = createAsyncThunk(
  "registrationForm/getRegistrationForm",
  async () => {
    return (await getRegistrationForm()).reverse();
  }
);

export const submitRegistrationForm = createAsyncThunk(
  "registrationForm/postRegistrationForm",
  async (data: RegistrationFormTypes) => {
    return await postRegistrationForm(data);
  }
);
