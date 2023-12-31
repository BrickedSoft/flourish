import { api } from "../../config/apiConfig";
import { api as apiData } from "../../../assets/data/server";
import {
  ApiQuestionnaireTypes,
  DeleteQuestionTypes,
  DeleteQuestionnaireTypes,
  FilledQuestionnaireTypes,
  PostQuestionTypes,
  PostQuestionnaireTypes,
  PutQuestionTypes,
  PutQuestionnaireTypes,
} from "../../../types/Questionnaire";
import { userTypes } from "../../../types/User";

export const getQuestionnaire = async (): Promise<ApiQuestionnaireTypes[]> => {
  const response = await api.get(apiData.questionnaire[userTypes.ADMIN], {});

  return response.data;
};

export const getAllQuestionnaire = async (): Promise<
  ApiQuestionnaireTypes[]
> => {
  const response = await api.get(apiData.allQuestionnaire, {});

  return response.data;
};

export const postQuestionnaire = async (
  data: PostQuestionnaireTypes
): Promise<void> => {
  return await api.post(apiData.questionnaire[userTypes.ADMIN], {
    ...data,
  });
};

export const putQuestionnaire = async (
  data: PutQuestionnaireTypes
): Promise<void> => {
  await api.put(apiData.questionnaire[userTypes.ADMIN], {
    ...data,
  });
};

export const deleteQuestionnaire = async (
  data: DeleteQuestionnaireTypes
): Promise<void> => {
  await api.delete(`${apiData.questionnaire[userTypes.ADMIN]}${data.id}/`);
};

export const postQuestion = async (data: PostQuestionTypes): Promise<void> => {
  await api.post(apiData.question, {
    ...data,
  });
};

export const putQuestion = async (data: PutQuestionTypes): Promise<void> => {
  await api.put(apiData.question, {
    ...data,
  });
};

export const deleteQuestion = async (
  data: DeleteQuestionTypes
): Promise<void> => {
  await api.delete(`${apiData.question}${data.id}/`);
};

/* -------------------------------------------------------------------------- */
/*                            Filled Questionnaire                            */
/* -------------------------------------------------------------------------- */

export const getFilledQuestionnaire = async (): Promise<
  FilledQuestionnaireTypes[]
> => (await api.get(apiData.filledQuestionnaire.ADMIN, {})).data;
