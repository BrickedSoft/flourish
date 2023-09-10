import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useStore";
import _ from "lodash";
import Questionnaire from "./components/Questionnaire";

const QuestionnaireDetails = () => {
  const { id } = useParams();
  const questionnaires = useAppSelector(
    (state) => state.questionnaire.questionnaires
  );

  const questionnaire = _.filter(questionnaires, function (questionnaire) {
    return questionnaire.id === id;
  })[0];

  return (
    <>
      <Questionnaire questionnaire={questionnaire} />
    </>
  );
};

export default QuestionnaireDetails;
