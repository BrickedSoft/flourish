import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";

import {
  deleteQuestion,
  deleteQuestionnaire,
  getAllQuestionnaire,
  getFilledQuestionnaire,
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
  GetFilledQuestionnaireTypes,
} from "../../../../types/Questionnaire";
import {
  KeyTypes,
  objectToString,
  stringToObject,
} from "../../../../utils/conversion";

export const createQuestionnaire = createAsyncThunk(
  "questionnaire/postQuestionnaire",
  async (data: QuestionnaireTypes) => {
    const optionsAndEvaluationRange = _.chain(data)
      .pick([QuestionnaireKeys.OPTIONS, QuestionnaireKeys.EVALUATION_RANGE])
      .map((value, key) => {
        return {
          [key]:
            value.length > 0 ? objectToString(value, ["name", "points"]) : "",
        };
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
  async (): Promise<{ [key: string]: QuestionnaireTypes }> => {
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

    return _.keyBy(
      _.merge(omittedObject, options, evaluation_range),
      QuestionnaireKeys.ID
    );
  }
);

export const fetchAllQuestionnaire = createAsyncThunk(
  "questionnaire/getQuestionnaire",
  async (): Promise<{ [key: string]: QuestionnaireTypes }> => {
    const data = await getAllQuestionnaire();
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

    return _.keyBy(
      _.merge(omittedObject, options, evaluation_range),
      QuestionnaireKeys.ID
    );
  }
);

/* --------------------------- Edit Questionnaire --------------------------- */

export const editQuestionnaire = createAsyncThunk(
  "questionnaire/putQuestionnaire",
  async (data: QuestionnaireTypes) => {
    const optionsAndEvaluationRange = _.chain(data)
      .pick([QuestionnaireKeys.OPTIONS, QuestionnaireKeys.EVALUATION_RANGE])
      .map((value, key) => {
        return {
          [key]:
            value.length > 0 ? objectToString(value, ["name", "points"]) : "",
        };
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

/* -------------------------------------------------------------------------- */
/*                            Filled Questionnaire                            */
/* -------------------------------------------------------------------------- */

export const fetchFilledQuestionnaire = createAsyncThunk(
  "questionnaire/getFilledQuestionnaire",
  async (): Promise<{ [key: string]: GetFilledQuestionnaireTypes }> => {
    const data = (await getFilledQuestionnaire()).reverse();

    const objects = _.map(data, (value) => {
      const filled = stringToObject(value.filled, [
        {
          key: "question",
          type: KeyTypes.String,
        },
        {
          key: "answer",
          type: KeyTypes.String,
        },
      ]);

      const comment = stringToObject(value.comment, [
        {
          key: "name",
          type: KeyTypes.String,
        },
        {
          key: "points",
          type: KeyTypes.Number,
        },
      ])[0];

      return {
        id: value.id,
        questionnaire: value.questionnaire,
        filled: filled,
        comment: comment,
        created_at: value.created_at,
        client: value.client,
      };
    });

    return _.keyBy(objects, "id") as unknown as {
      [key: string]: GetFilledQuestionnaireTypes;
    };
  }
);
