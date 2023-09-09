import { createAsyncThunk } from "@reduxjs/toolkit";

import { getQuestionnaire } from "../../api/apiQuestionnaire";
import { Questionnaire } from "../../types/Questionnaire";

export const fetchQuestionnaire = createAsyncThunk(
  "flourish/questionnaire",
  async (): Promise<Questionnaire[]> => {
    return await getQuestionnaire();
  }
);
