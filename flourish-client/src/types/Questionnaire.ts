export interface Questionnaire {
  name: string;
  questionnaireFields: {
    question: string;
  }[];
  options: string;
  evaluation_range: string;
}
