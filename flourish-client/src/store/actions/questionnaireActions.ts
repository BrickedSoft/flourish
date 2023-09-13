import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";

import {
  deleteQuestion,
  getQuestionnaire,
  postQuestion,
  putQuestionnaire,
} from "../../api/apiQuestionnaire";
import {
  DeleteQuestion,
  PostQuestion,
  PostQuestionnaire,
  Questionnaire,
  QuestionnaireKeys,
} from "../../types/Questionnaire";
import {
  KeyTypes,
  objectToString,
  stringToObject,
} from "../../utils/Questionnaire";

export const fetchQuestionnaire = createAsyncThunk(
  "questionnaire/getQuestionnaire",
  async (): Promise<Questionnaire[]> => {
    const data = await getQuestionnaire();
    const options = _.chain(data)
      .map("options")
      .map((value) =>
        value
          ? stringToObject(value, [
              { key: "name", type: KeyTypes.String },
              { key: "points", type: KeyTypes.Number },
            ])
          : []
      )
      .map((value, index) => {
        return { options: value };
      })
      .value();

    const evaluation_range = _.chain(data)
      .map("evaluation_range")
      .map((value) =>
        value
          ? stringToObject(value, [
              { key: "name", type: KeyTypes.String },
              { key: "points", type: KeyTypes.Number },
            ])
          : []
      )
      .map((value, index) => {
        return { evaluation_range: value };
      })
      .value();

    const omittedObject = _.map(
      data,
      (value) =>
        _.omit(value, [
          "options",
          "evaluation_range",
        ]) as unknown as Questionnaire
    );

    return _.merge(omittedObject, options, evaluation_range) as Questionnaire[];
  }
);

export const editQuestionnaire = createAsyncThunk(
  "questionnaire/putQuestionnaire",
  async (data: Questionnaire) => {
    const optionsAndEvaluationRange = _.chain(data)
      .pick([QuestionnaireKeys.OPTIONS, QuestionnaireKeys.EVALUATION_RANGE])
      .map((value, key) => {
        return { [key]: objectToString(value) };
      })
      .value();

    const omittedObject = _.omit(data, [
      "options",
      "evaluation_range",
    ]) as unknown as Questionnaire;

    _.chain(optionsAndEvaluationRange)
      .map((value) => _.merge(omittedObject, value))
      .value();

    return await putQuestionnaire(
      omittedObject as unknown as PostQuestionnaire
    );
  }
);

export const setQuestion = createAsyncThunk(
  "questionnaire/postQuestion",
  async (data: PostQuestion) => {
    return await postQuestion(data);
  }
);

export const removeQuestion = createAsyncThunk(
  "questionnaire/deleteQuestion",
  async (data: DeleteQuestion) => {
    return await deleteQuestion(data);
  }
);
