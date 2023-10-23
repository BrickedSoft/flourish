import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";

import { getQuestionnaire } from "../../../../api/apiQuestionnaire/client";
import { QuestionnaireTypes } from "../../../../types/Questionnaire";
import { KeyTypes, stringToObject } from "../../../../utils/questionnaire";

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
