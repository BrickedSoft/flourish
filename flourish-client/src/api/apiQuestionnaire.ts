import { api as apiData } from "../assets/data/server";
import { Questionnaire } from "../types/Questionnaire";
import { api } from "./config/apiConfig";

export const getQuestionnaire = async (): Promise<Questionnaire[]> => {
  const response = await api.get(apiData.questionnaire.adminCounselor, {});

  return response.data;
};
