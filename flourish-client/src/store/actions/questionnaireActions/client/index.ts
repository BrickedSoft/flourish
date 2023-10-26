import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";

import {
  getFilledQuestionnaire,
  getQuestionnaire,
  postFilledQuestionnaire,
} from "../../../../api/apiQuestionnaire/client";
import {
  GetFilledQuestionnaireTypes,
  PostFilledQuestionnaireTypes,
  QuestionnaireKeys,
  QuestionnaireTypes,
} from "../../../../types/Questionnaire";
import {
  KeyTypes,
  objectToString,
  stringToObject,
} from "../../../../utils/conversion";

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

/* -------------------------------------------------------------------------- */
/*                            Filled Questionnaire                            */
/* -------------------------------------------------------------------------- */

export const fetchFilledQuestionnaire = createAsyncThunk(
  "questionnaire/getFilledQuestionnaire",
  async (): Promise<{ [key: string]: GetFilledQuestionnaireTypes }> => {
    const data = await getFilledQuestionnaire();

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
      };
    });

    return _.keyBy(objects, "id") as unknown as {
      [key: string]: GetFilledQuestionnaireTypes;
    };
  }
);

export const submitFilledQuestionnaire = createAsyncThunk(
  "questionnaire/postFilledQuestionnaire",
  async (data: PostFilledQuestionnaireTypes) => {
    const comment = objectToString([data.comment], ["name", "points"]);
    const questions = _.keyBy(data.questionnaire.questionnaireFields, "id");
    const answers = _.mapValues(data.filled, (value, key) => {
      return {
        answer: value,
      };
    });
    const questionAndAnswers = _.values(_.merge(answers, questions));

    const questionAndAnswersString = objectToString(questionAndAnswers, [
      "question",
      "answer",
    ]);

    return await postFilledQuestionnaire({
      questionnaire: data.questionnaire!.id!,
      filled: questionAndAnswersString,
      comment,
    });
  }
);
