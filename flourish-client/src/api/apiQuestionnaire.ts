import { api as apiData } from "../assets/data/server";
import {
  PostQuestion,
  DeleteQuestion,
  PutQuestionnaire,
  ApiQuestionnaire,
  DeleteQuestionnaire,
  PostQuestionnaire,
  PutQuestion,
} from "../types/Questionnaire";
import { userTypes } from "../types/User";
import { api } from "./config/apiConfig";

export const postQuestionnaire = async (
  data: PostQuestionnaire
): Promise<void> => {
  console.log(data);
  return await api.post(apiData.questionnaire[userTypes.ADMIN], {
    ...data,
    questionnaireFields: [],
  });
};

export const getQuestionnaire = async (): Promise<ApiQuestionnaire[]> => {
  const response = await api.get(apiData.questionnaire[userTypes.ADMIN], {});

  return response.data;
};

export const putQuestionnaire = async (
  data: PutQuestionnaire
): Promise<void> => {
  await api.put(apiData.questionnaire[userTypes.ADMIN], {
    ...data,
  });
};

export const deleteQuestionnaire = async (
  data: DeleteQuestionnaire
): Promise<void> => {
  await api.delete(`${apiData.questionnaire[userTypes.ADMIN]}${data.id}/`);
};

export const postQuestion = async (data: PostQuestion): Promise<void> => {
  await api.post(apiData.question, {
    ...data,
  });
};

export const putQuestion = async (data: PutQuestion): Promise<void> => {
  await api.put(apiData.question, {
    ...data,
  });
};

export const deleteQuestion = async (data: DeleteQuestion): Promise<void> => {
  await api.delete(`${apiData.question}${data.id}/`);
};
