import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import _ from "lodash";

import { Questionnaire } from "../../types/Questionnaire";
import { Status } from "../../types/Status";
import { fetchQuestionnaire } from "../actions/questionnaireActions";

interface reducerType {
  questionnaires: Questionnaire[];
  status: Status;
}

const initialState: reducerType = {
  questionnaires: [],
  status: Status.IDLE,
};

const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    purgeQuestionnaire: (state) => {
      _.mapKeys(initialState, (value, key) => {
        //@ts-ignore
        state[key] = value;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestionnaire.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(fetchQuestionnaire.fulfilled, (state, action) => {
      state.questionnaires = action.payload;
      state.status = Status.FULFILLED;
    });
    builder.addCase(fetchQuestionnaire.rejected, (state) => {
      state.questionnaires = [];
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

export default questionnaireSlice.reducer;
export const { purgeQuestionnaire } = questionnaireSlice.actions;
export const { name } = questionnaireSlice;
