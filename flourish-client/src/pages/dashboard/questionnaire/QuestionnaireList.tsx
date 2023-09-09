import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { fetchQuestionnaire } from "../../../store/actions/questionnaireActions";
import QuestionnaireCard from "./components/QuestionnaireCard";
import { Outlet } from "react-router-dom";

const QuestionnaireList = () => {
  const dispatch = useAppDispatch();
  const questionnaires = useAppSelector(
    (state) => state.questionnaire.questionnaires
  );

  useEffect(() => {
    dispatch(fetchQuestionnaire());
  }, [dispatch]);

  return (
    <SimpleGrid
      spacing={16}
      borderRadius={"xl"}
      templateRows="repeat(auto-fill)"
    >
      {questionnaires.map((questionnaire, index) => (
        <QuestionnaireCard key={index} questionnaire={questionnaire} />
      ))}
    </SimpleGrid>
  );
};

export default QuestionnaireList;
