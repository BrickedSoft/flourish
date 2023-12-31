import { useEffect } from "react";

import QuestionnaireListGeneric from "../../../../components/questionnaire/QuestionnaireListGeneric";
import { useAppDispatch } from "../../../../hooks/useStore";
import { fetchQuestionnaire } from "../../../../store/actions/questionnaireActions/admin";

const QuestionnaireList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestionnaire());
  }, [dispatch]);

  return (
    <>
      <QuestionnaireListGeneric />
    </>
  );
};

export default QuestionnaireList;
