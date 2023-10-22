import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { PURGE } from "redux-persist";

import { RegistrationForm } from "../../types/RegistrationForm";
import { Status } from "../../types/Status";
import { submitForm } from "../actions/registrationFormActions";

interface reducerType {
  registrationForm: RegistrationForm[];
  status: Status;
}

const initialState: reducerType = {
  registrationForm: [],
  status: Status.IDLE,
};

const registrationFormSlice = createSlice({
  name: "registrationForm",
  initialState,
  reducers: {
    purgeQuestionnaire: (state) => {
      state.registrationForm = [];
    },
  },
  extraReducers: (builder) => {
    /* ------------------------------- Submit Form ------------------------------ */

    builder.addCase(submitForm.pending, (state) => {
      state.status = Status.PENDING;
    });

    builder.addCase(submitForm.fulfilled, (state) => {
      state.status = Status.FULFILLED;
    });

    builder.addCase(submitForm.rejected, (state) => {
      state.status = Status.REJECTED;
    });

    /* ---------------------------------- PURGE --------------------------------- */

    builder.addCase(PURGE, (state) => {
      _.mapKeys(initialState, (value, key) => {
        //@ts-ignore
        state[key] = value;
      });
    });
  },
});

export default registrationFormSlice.reducer;
export const { purgeQuestionnaire } = registrationFormSlice.actions;
export const { name } = registrationFormSlice;
