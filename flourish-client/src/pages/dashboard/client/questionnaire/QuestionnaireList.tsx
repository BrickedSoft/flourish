import { useEffect } from "react";

import QuestionnaireListGeneric from "../../../../components/questionnaire/QuestionnaireListGeneric";
import { useAppDispatch } from "../../../../hooks/useStore";
import { fetchQuestionnaire } from "../../../../store/actions/questionnaireActions/client";

const QuestionnaireList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestionnaire());
  }, [dispatch]);

  return (
    <>
      <QuestionnaireListGeneric showButtons={false} isLink />
    </>
  );
};

export default QuestionnaireList;
