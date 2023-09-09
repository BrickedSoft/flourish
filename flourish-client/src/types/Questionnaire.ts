import { userTypes } from "./User";

export interface Questionnaire {
  id: string | null;
  name: string;
  questionnaireFields: QuestionnaireFields[];
  options: string;
  evaluation_range: string;
  [userTypes.ADMIN]: string;
}

export interface QuestionnaireFields {
  id?: string;
  question: string;
}
