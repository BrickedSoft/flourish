import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { PURGE } from "redux-persist";

import { Questionnaire } from "../../types/Questionnaire";
import { Status } from "../../types/Status";
import {
  editQuestion,
  editQuestionnaire,
  fetchQuestionnaire,
  removeQuestion,
  removeQuestionnaire,
  setQuestion,
} from "../actions/questionnaireActions";

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
      state.questionnaires = [];
    },
  },
  extraReducers: (builder) => {
    /* --------------------------- Fetch Questionnaire -------------------------- */
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

    /* --------------------------- Edit Questionnaire --------------------------- */
    builder.addCase(editQuestionnaire.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(editQuestionnaire.fulfilled, (state) => {
      state.status = Status.FULFILLED;
    });
    builder.addCase(editQuestionnaire.rejected, (state) => {
      state.status = Status.REJECTED;
    });

    /* --------------------------- Remove Questionnaire -------------------------- */

    builder.addCase(removeQuestionnaire.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(removeQuestionnaire.fulfilled, (state) => {
      state.status = Status.FULFILLED;
    });
    builder.addCase(removeQuestionnaire.rejected, (state) => {
      state.status = Status.REJECTED;
    });

    /* ------------------------------ Set Question ------------------------------ */
    builder.addCase(setQuestion.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(setQuestion.fulfilled, (state) => {
      state.status = Status.FULFILLED;
    });
    builder.addCase(setQuestion.rejected, (state) => {
      state.status = Status.REJECTED;
    });

    /* ----------------------------- Edit Question ----------------------------- */
    builder.addCase(editQuestion.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(editQuestion.fulfilled, (state) => {
      state.status = Status.FULFILLED;
    });
    builder.addCase(editQuestion.rejected, (state) => {
      state.status = Status.REJECTED;
    });

    /* ----------------------------- Remove Question ---------------------------- */
    builder.addCase(removeQuestion.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(removeQuestion.fulfilled, (state) => {
      state.status = Status.FULFILLED;
    });
    builder.addCase(removeQuestion.rejected, (state) => {
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
