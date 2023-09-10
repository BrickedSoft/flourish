import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteQuestion,
  getQuestionnaire,
  postQuestion,
} from "../../api/apiQuestionnaire";
import {
  Questionnaire,
  PostQuestion,
  DeleteQuestion,
} from "../../types/Questionnaire";

export const fetchQuestionnaire = createAsyncThunk(
  "questionnaire/getQuestionnaire",
  async (): Promise<Questionnaire[]> => {
    return await getQuestionnaire();
  }
);

export const setQuestion = createAsyncThunk(
  "questionnaire/postQuestion",
  async (data: PostQuestion): Promise<void> => {
    return await postQuestion(data);
  }
);

export const removeQuestion = createAsyncThunk(
  "questionnaire/deleteQuestion",
  async (data: DeleteQuestion): Promise<void> => {
    return await deleteQuestion(data);
  }
);
