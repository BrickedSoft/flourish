import { api } from "./config/apiConfig";
import { api as apiData } from "../assets/data/server";
import {
  ApiQuestionnaireTypes,
  DeleteQuestionTypes,
  DeleteQuestionnaireTypes,
  PostQuestionTypes,
  PostQuestionnaireTypes,
  PutQuestionTypes,
  PutQuestionnaireTypes,
} from "../types/Questionnaire";
import { userTypes } from "../types/User";

/* -------------------------------------------------------------------------- */
/*                                    Admin                                   */
/* -------------------------------------------------------------------------- */

export const getQuestionnaireAdmin = async (): Promise<
  ApiQuestionnaireTypes[]
> => {
  const response = await api.get(apiData.questionnaire[userTypes.ADMIN], {});

  return response.data;
};

export const postQuestionnaireAdmin = async (
  data: PostQuestionnaireTypes
): Promise<void> => {
  return await api.post(apiData.questionnaire[userTypes.ADMIN], {
    ...data,
  });
};

export const putQuestionnaireAdmin = async (
  data: PutQuestionnaireTypes
): Promise<void> => {
  await api.put(apiData.questionnaire[userTypes.ADMIN], {
    ...data,
  });
};

export const deleteQuestionnaireAdmin = async (
  data: DeleteQuestionnaireTypes
): Promise<void> => {
  await api.delete(`${apiData.questionnaire[userTypes.ADMIN]}${data.id}/`);
};

export const postQuestionAdmin = async (
  data: PostQuestionTypes
): Promise<void> => {
  await api.post(apiData.question, {
    ...data,
  });
};

export const putQuestionAdmin = async (
  data: PutQuestionTypes
): Promise<void> => {
  await api.put(apiData.question, {
    ...data,
  });
};

export const deleteQuestionAdmin = async (
  data: DeleteQuestionTypes
): Promise<void> => {
  await api.delete(`${apiData.question}${data.id}/`);
};
