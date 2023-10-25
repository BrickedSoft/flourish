export enum QuestionnaireKeys {
  ID = "id",
  NAME = "name",
  QUESTIONNAIRE_FIELDS = "questionnaireFields",
  OPTIONS = "options",
  EVALUATION_RANGE = "evaluation_range",
  ADMIN_COUNSELOR = "adminCounselor",
}

export interface QuestionnaireTypes {
  [QuestionnaireKeys.ID]: string | null;
  [QuestionnaireKeys.NAME]: string;
  [QuestionnaireKeys.QUESTIONNAIRE_FIELDS]: QuestionTypes[];
  [QuestionnaireKeys.OPTIONS]: OptionAndEvaluationRangeTypes[];
  [QuestionnaireKeys.EVALUATION_RANGE]: OptionAndEvaluationRangeTypes[];
  [QuestionnaireKeys.ADMIN_COUNSELOR]: string;
}

export interface ApiQuestionnaireTypes
  extends Omit<QuestionnaireTypes, "options" | "evaluation_range"> {
  [QuestionnaireKeys.OPTIONS]: string;
  [QuestionnaireKeys.EVALUATION_RANGE]: string;
}

export interface PostQuestionnaireTypes {
  [QuestionnaireKeys.NAME]: string;
  [QuestionnaireKeys.QUESTIONNAIRE_FIELDS]?: Omit<
    QuestionTypes,
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

export interface PutQuestionnaireTypes {
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

export interface DeleteQuestionnaireTypes {
  id: string;
}

export interface QuestionTypes {
  id?: string;
  question: string;
}

export interface PostQuestionTypes {
  question: string;
  questionnaire: string;
}

export interface PutQuestionTypes {
  id: string;
  question: string;
}

export interface DeleteQuestionTypes {
  id: string;
}

export interface OptionAndEvaluationRangeTypes {
  name: string;
  points: number;
}

export type FilledQuestionnaireTypes = {
  filled: string;
  comment: string;
  questionnaire: string;
};

export type PostFilledQuestionnaireTypes = {
  questionnaire: QuestionnaireTypes;
  filled: {
    [key: string]: string;
  };
  comment: OptionAndEvaluationRangeTypes;
};
