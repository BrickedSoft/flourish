import { useEffect } from "react";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";

import { routes } from "../../../../assets/data/routes";
import QuestionnaireDetails from "../../../../components/questionnaire/QuestionnaireDetails";
import { useAppSelector } from "../../../../hooks/useStore";
import { OptionAndEvaluationRangeTypes } from "../../../../types/Questionnaire";
import { Status } from "../../../../types/Status";

const FilledQuestionnaireDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const status = useAppSelector((state) => state.questionnaire.status);
  const filledQuestionnaire = useAppSelector(
    (state) => state.questionnaire.filledQuestionnaire[id as string]
  );
  const questionnaire = useAppSelector(
    (state) =>
      state.questionnaire.questionnaires[filledQuestionnaire?.questionnaire]
  );
  const questions = _.map(
    filledQuestionnaire?.filled,
    (item: { question: string; answer: string }, index: number) => {
      return {
        id: index.toString(),
        question: item.question,
        answer: item.answer,
      };
    }
  );
  const options = _.chain(filledQuestionnaire?.filled)
    .map("answer")
    .uniq()
    .map((item) => ({
      name: item,
      point: 0,
    }))
    .value();

  useEffect(() => {
    if (status === Status.FULFILLED && !filledQuestionnaire)
      navigate(routes[404]);
  }, [filledQuestionnaire, navigate, status]);

  return (
    <>
      <QuestionnaireDetails
        questions={questions}
        options={
          questionnaire
            ? questionnaire?.options
            : (options as unknown as OptionAndEvaluationRangeTypes[])
        }
        isReadOnly={true}
        totalPoints={filledQuestionnaire?.comment.points}
        comment={filledQuestionnaire?.comment.name}
        showButtonEach={[true, false, false]}
      />
    </>
  );
};

export default FilledQuestionnaireDetails;
