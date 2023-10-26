import React from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import { useAppSelector } from "../../../../hooks/useStore";
import QuestionnaireDetails from "../../../../components/questionnaire/QuestionnaireDetails";

const FilledQuestionnaireDetails = () => {
  const { id } = useParams();
  const filledQuestionnaire = useAppSelector(
    (state) => state.questionnaire.filledQuestionnaire[id as string]
  );

  return <></>;
};

export default FilledQuestionnaireDetails;
