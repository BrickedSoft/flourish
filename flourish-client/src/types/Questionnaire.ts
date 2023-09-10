import { userTypes } from "./User";

export interface Questionnaire {
  id: string | null;
  name: string;
  questionnaireFields: Question[];
  options: string;
  evaluation_range: string;
  [userTypes.ADMIN]: string;
}

export interface Question {
  id?: string;
  question: string;
}

export interface PostQuestion {
  question: string;
  questionnaire: string;
}

export interface DeleteQuestion {
  id: string;
}
