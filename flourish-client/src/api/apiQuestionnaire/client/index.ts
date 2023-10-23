import { api as apiData } from "../../../assets/data/server";
import { ApiQuestionnaireTypes } from "../../../types/Questionnaire";
import { userTypes } from "../../../types/User";
import { api } from "../../config/apiConfig";

export const getQuestionnaire = async (): Promise<ApiQuestionnaireTypes[]> =>
  (await api.get(apiData.questionnaire[userTypes.CLIENT], {})).data;
