import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";

import {
  getQuestionnaire,
  postFilledQuestionnaire,
} from "../../../../api/apiQuestionnaire/client";
import {
  PostFilledQuestionnaireTypes,
  QuestionnaireKeys,
  QuestionnaireTypes
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
      comment: comment,
    });
  }
);
