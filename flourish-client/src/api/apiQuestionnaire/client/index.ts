import { api as apiData } from "../../../assets/data/server";
import {
  ApiQuestionnaireTypes,
  FilledQuestionnaireTypes,
} from "../../../types/Questionnaire";
import { userTypes } from "../../../types/User";
import { api } from "../../config/apiConfig";

export const getQuestionnaire = async (): Promise<ApiQuestionnaireTypes[]> =>
  (await api.get(apiData.questionnaire[userTypes.CLIENT], {})).data;

/* -------------------------------------------------------------------------- */
/*                            Filled Questionnaire                            */
/* -------------------------------------------------------------------------- */

// export const getFilledQuestionnaire = async (): Promise<ApiQuestionnaireTypes[]> =>{}

export const postFilledQuestionnaire = async (
  data: FilledQuestionnaireTypes
): Promise<void> => {
  await api.post(apiData.filledQuestionnaire.CLIENT, {
    ...data,
  });
};
