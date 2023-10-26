import { useAppSelector } from "../../../../hooks/useStore";
import FilledQuestionnaireListsGeneric from "../../../../components/questionnaire/FilledQuestionnaireListGeneric";

const FilledQuestionnaireList = () => {
  const filledQuestionnaires = useAppSelector(
    (state) => state.questionnaire.filledQuestionnaire
  );
  const questionnaires = useAppSelector(
    (state) => state.questionnaire.questionnaires
  );

  return (
    <FilledQuestionnaireListsGeneric
      filledQuestionnaires={filledQuestionnaires}
      questionnaires={questionnaires}
    />
  );
};

export default FilledQuestionnaireList;
