import { useEffect } from "react";
import _ from "lodash";
import { useAppSelector } from "../../../../hooks/useStore";

import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../../assets/data/routes";
import QuestionnaireDetails from "../../../../components/questionnaire/QuestionnaireDetails";
import { Status } from "../../../../types/Status";

type QuestionType = {
  id: string;
  question: string;
};

const QuestionnaireFillUp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const status = useAppSelector((state) => state.questionnaire.status);
  const questionnaire = useAppSelector(
    (state) => state.questionnaire.questionnaires[id as string]
  );
  const questions = _.map(questionnaire?.questionnaireFields, (value) => {
    return _.pick(value, ["id", "question"]);
  }) as QuestionType[];

  useEffect(() => {
    if (status === Status.FULFILLED && !questionnaire) navigate(routes[404]);
  }, [questionnaire, navigate, status]);

  return (
    <QuestionnaireDetails
      questions={questions}
      questionnaire={questionnaire}
      options={questionnaire?.options}
      evaluationRange={questionnaire?.evaluation_range}
    />
  );
};

export default QuestionnaireFillUp;
