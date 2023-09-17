import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";

import {
  deleteQuestion,
  deleteQuestionnaire,
  getQuestionnaire,
  postQuestion,
  postQuestionnaire,
  putQuestion,
  putQuestionnaire,
} from "../../api/apiQuestionnaire";
import {
  DeleteQuestion,
  DeleteQuestionnaire,
  PostQuestion,
  PostQuestionnaire,
  PutQuestion,
  PutQuestionnaire,
  Questionnaire,
  QuestionnaireKeys,
} from "../../types/Questionnaire";
import {
  KeyTypes,
  objectToString,
  stringToObject,
} from "../../utils/questionnaire";

export const createQuestionnaire = createAsyncThunk(
  "questionnaire/postQuestionnaire",
  async (data: Questionnaire) => {
    const optionsAndEvaluationRange = _.chain(data)
      .pick([QuestionnaireKeys.OPTIONS, QuestionnaireKeys.EVALUATION_RANGE])
      .map((value, key) => {
        return { [key]: value.length > 0 ? objectToString(value) : "" };
      })
      .value();

    const omittedObject = _.omit(data, [
      QuestionnaireKeys.OPTIONS,
      QuestionnaireKeys.EVALUATION_RANGE,
    ]) as PostQuestionnaire;

    _.chain(optionsAndEvaluationRange)
      .map((value) => _.merge(omittedObject, value))
      .value();

    if (_.isEmpty(omittedObject.questionnaireFields))
      omittedObject.questionnaireFields = [];

    return await postQuestionnaire(omittedObject);
  }
);

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
      .map((value) => {
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
      .map((value) => {
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

    return _.merge(omittedObject, options, evaluation_range);
  }
);

/* --------------------------- Edit Questionnaire --------------------------- */

export const editQuestionnaire = createAsyncThunk(
  "questionnaire/putQuestionnaire",
  async (data: Questionnaire) => {
    const optionsAndEvaluationRange = _.chain(data)
      .pick([QuestionnaireKeys.OPTIONS, QuestionnaireKeys.EVALUATION_RANGE])
      .map((value, key) => {
        return { [key]: value.length > 0 ? objectToString(value) : "" };
      })
      .value();

    const omittedObject = _.omit(data, [
      QuestionnaireKeys.OPTIONS,
      QuestionnaireKeys.EVALUATION_RANGE,
    ]) as PutQuestionnaire;

    _.chain(optionsAndEvaluationRange)
      .map((value) => _.merge(omittedObject, value))
      .value();

    return await putQuestionnaire(omittedObject);
  }
);

export const removeQuestionnaire = createAsyncThunk(
  "questionnaire/deleteQuestionnaire",
  async (data: DeleteQuestionnaire) => {
    return await deleteQuestionnaire(data);
  }
);

export const setQuestion = createAsyncThunk(
  "questionnaire/postQuestion",
  async (data: PostQuestion) => {
    return await postQuestion(data);
  }
);

export const editQuestion = createAsyncThunk(
  "questionnaire/editQuestion",
  async (data: PutQuestion) => {
    return await putQuestion(data);
  }
);

export const removeQuestion = createAsyncThunk(
  "questionnaire/deleteQuestion",
  async (data: DeleteQuestion) => {
    return await deleteQuestion(data);
  }
);
