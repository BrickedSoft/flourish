import { api as apiData } from "../assets/data/server";
import {
  Questionnaire,
  PostQuestion,
  DeleteQuestion,
} from "../types/Questionnaire";
import { userTypes } from "../types/User";
import { api } from "./config/apiConfig";

export const getQuestionnaire = async (): Promise<Questionnaire[]> => {
  const response = await api.get(apiData.questionnaire[userTypes.ADMIN], {});

  return response.data;
};

export const postQuestion = async (data: PostQuestion): Promise<void> => {
  await api.post(apiData.question, {
    ...data,
  });
};

export const deleteQuestion = async (data: DeleteQuestion): Promise<void> => {
  await api.delete(`${apiData.question}${data.id}/`);
};
