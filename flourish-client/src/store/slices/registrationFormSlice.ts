import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { PURGE } from "redux-persist";

import { RegistrationFormTypes } from "../../types/RegistrationForm";
import { Status } from "../../types/Status";
import {
  fetchRegistrationForm,
  submitRegistrationForm,
} from "../actions/formActions";

interface reducerType {
  forms: RegistrationFormTypes[];
  status: Status;
}

const initialState: reducerType = {
  forms: [],
  status: Status.IDLE,
};

const formslice = createSlice({
  name: "registrationForm",
  initialState,
  reducers: {
    purgeQuestionnaire: (state) => {
      state.forms = [];
    },
  },
  extraReducers: (builder) => {
    /* ------------------------------- Fetch Form ------------------------------ */

    builder.addCase(fetchRegistrationForm.pending, (state) => {
      state.status = Status.PENDING;
    });

    builder.addCase(fetchRegistrationForm.fulfilled, (state, action) => {
      state.forms = action.payload;
      state.status = Status.FULFILLED;
    });

    builder.addCase(fetchRegistrationForm.rejected, (state) => {
      state.status = Status.REJECTED;
    });

    /* ------------------------------- Submit Form ------------------------------ */

    builder.addCase(submitRegistrationForm.pending, (state) => {
      state.status = Status.PENDING;
    });

    builder.addCase(submitRegistrationForm.fulfilled, (state) => {
      state.status = Status.FULFILLED;
    });

    builder.addCase(submitRegistrationForm.rejected, (state) => {
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

export default formslice.reducer;
export const { purgeQuestionnaire } = formslice.actions;
export const { name } = formslice;
