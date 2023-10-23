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
} from "../../../../api/apiQuestionnaire/admin";
import {
  DeleteQuestionTypes,
  DeleteQuestionnaireTypes,
  PostQuestionTypes,
  PostQuestionnaireTypes,
  PutQuestionTypes,
  PutQuestionnaireTypes,
  QuestionnaireTypes,
  QuestionnaireKeys,
} from "../../../../types/Questionnaire";
import {
  KeyTypes,
  objectToString,
  stringToObject,
} from "../../../../utils/questionnaire";

export const createQuestionnaire = createAsyncThunk(
  "questionnaire/postQuestionnaire",
  async (data: QuestionnaireTypes) => {
    const optionsAndEvaluationRange = _.chain(data)
      .pick([QuestionnaireKeys.OPTIONS, QuestionnaireKeys.EVALUATION_RANGE])
      .map((value, key) => {
        return { [key]: value.length > 0 ? objectToString(value) : "" };
      })
      .value();

    const omittedObject = _.omit(data, [
      QuestionnaireKeys.OPTIONS,
      QuestionnaireKeys.EVALUATION_RANGE,
    ]) as PostQuestionnaireTypes;

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
  async (): Promise<QuestionnaireTypes[]> => {
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
        ]) as unknown as QuestionnaireTypes
    );

    return _.merge(omittedObject, options, evaluation_range);
  }
);

/* --------------------------- Edit Questionnaire --------------------------- */

export const editQuestionnaire = createAsyncThunk(
  "questionnaire/putQuestionnaire",
  async (data: QuestionnaireTypes) => {
    const optionsAndEvaluationRange = _.chain(data)
      .pick([QuestionnaireKeys.OPTIONS, QuestionnaireKeys.EVALUATION_RANGE])
      .map((value, key) => {
        return { [key]: value.length > 0 ? objectToString(value) : "" };
      })
      .value();

    const omittedObject = _.omit(data, [
      QuestionnaireKeys.OPTIONS,
      QuestionnaireKeys.EVALUATION_RANGE,
    ]) as PutQuestionnaireTypes;

    _.chain(optionsAndEvaluationRange)
      .map((value) => _.merge(omittedObject, value))
      .value();

    return await putQuestionnaire(omittedObject);
  }
);

export const removeQuestionnaire = createAsyncThunk(
  "questionnaire/deleteQuestionnaire",
  async (data: DeleteQuestionnaireTypes) => {
    return await deleteQuestionnaire(data);
  }
);

export const setQuestion = createAsyncThunk(
  "questionnaire/postQuestion",
  async (data: PostQuestionTypes) => {
    return await postQuestion(data);
  }
);

export const editQuestion = createAsyncThunk(
  "questionnaire/editQuestion",
  async (data: PutQuestionTypes) => {
    return await putQuestion(data);
  }
);

export const removeQuestion = createAsyncThunk(
  "questionnaire/deleteQuestion",
  async (data: DeleteQuestionTypes) => {
    return await deleteQuestion(data);
  }
);
