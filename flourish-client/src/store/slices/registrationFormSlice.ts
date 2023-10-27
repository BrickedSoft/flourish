import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { PURGE } from "redux-persist";

import { RegistrationFormTypes } from "../../types/RegistrationForm";
import { Status } from "../../types/Status";
import {
  editRegistrationForm,
  fetchCounselorList,
  fetchRegistrationForm,
  submitRegistrationForm,
} from "../actions/registrationFormActions";
import { CounselorTypes } from "../../types/User";

interface reducerType {
  forms: RegistrationFormTypes[];
  counselorList: CounselorTypes[];
  status: Status;
}

const initialState: reducerType = {
  forms: [],
  counselorList: [],
  status: Status.IDLE,
};

const formSlice = createSlice({
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

    /* -------------------------------- Edit Form ------------------------------- */

    builder.addCase(editRegistrationForm.pending, (state) => {
      state.status = Status.PENDING;
    });

    builder.addCase(editRegistrationForm.fulfilled, (state) => {
      state.status = Status.FULFILLED;
    });

    builder.addCase(editRegistrationForm.rejected, (state) => {
      state.status = Status.REJECTED;
    });

    /* ----------------------------- Counselor List ----------------------------- */

    builder.addCase(fetchCounselorList.pending, (state) => {
      state.status = Status.PENDING;
    });

    builder.addCase(fetchCounselorList.fulfilled, (state, action) => {
      state.counselorList = action.payload;
      state.status = Status.FULFILLED;
    });

    builder.addCase(fetchCounselorList.rejected, (state) => {
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

export default formSlice.reducer;
export const { purgeQuestionnaire } = formSlice.actions;
export const { name } = formSlice;
