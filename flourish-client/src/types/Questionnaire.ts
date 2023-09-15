export enum QuestionnaireKeys {
  ID = "id",
  NAME = "name",
  QUESTIONNAIRE_FIELDS = "questionnaireFields",
  OPTIONS = "options",
  EVALUATION_RANGE = "evaluation_range",
  ADMIN_COUNSELOR = "adminCounselor",
}

export interface Questionnaire {
  [QuestionnaireKeys.ID]: string | null;
  [QuestionnaireKeys.NAME]: string;
  [QuestionnaireKeys.QUESTIONNAIRE_FIELDS]: Question[];
  [QuestionnaireKeys.OPTIONS]: OptionAndEvaluationRange[];
  [QuestionnaireKeys.EVALUATION_RANGE]: OptionAndEvaluationRange[];
  [QuestionnaireKeys.ADMIN_COUNSELOR]: string;
}

export interface ApiQuestionnaire
  extends Omit<Questionnaire, "options" | "evaluation_range"> {
  [QuestionnaireKeys.OPTIONS]: string;
  [QuestionnaireKeys.EVALUATION_RANGE]: string;
}

export interface PostQuestionnaire {
  [QuestionnaireKeys.NAME]: string;
  [QuestionnaireKeys.QUESTIONNAIRE_FIELDS]?: Omit<
    Question,
    QuestionnaireKeys.ID
  >[];
  [QuestionnaireKeys.OPTIONS]?: string;
  [QuestionnaireKeys.EVALUATION_RANGE]?: string;
}

export const postQuestionnaireKeys = [
  QuestionnaireKeys.NAME,
  QuestionnaireKeys.OPTIONS,
  QuestionnaireKeys.EVALUATION_RANGE,
  QuestionnaireKeys.QUESTIONNAIRE_FIELDS,
];

export interface PutQuestionnaire {
  [QuestionnaireKeys.ID]: string;
  [QuestionnaireKeys.NAME]?: string;
  [QuestionnaireKeys.OPTIONS]?: string;
  [QuestionnaireKeys.EVALUATION_RANGE]?: string;
}

export const putQuestionnaireKeys = [
  [QuestionnaireKeys.ID],
  QuestionnaireKeys.NAME,
  QuestionnaireKeys.OPTIONS,
  QuestionnaireKeys.EVALUATION_RANGE,
];

export interface DeleteQuestionnaire {
  id: string;
}

export interface Question {
  id?: string;
  question: string;
}

export interface PostQuestion {
  question: string;
  questionnaire: string;
}

export interface PutQuestion {
  id: string;
  question: string;
}

export interface DeleteQuestion {
  id: string;
}

export interface OptionAndEvaluationRange {
  name: string;
  points: number;
}