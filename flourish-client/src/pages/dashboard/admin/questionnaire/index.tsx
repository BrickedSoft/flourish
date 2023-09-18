import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import { fetchQuestionnaire } from "../../../../store/actions/questionnaireActions";
import QuestionnaireCard from "../../../../components/questionnaire/QuestionnaireCard";
import { Outlet } from "react-router-dom";

const Questionnaire = () => {
  const dispatch = useAppDispatch();
  const questionnaires = useAppSelector(
    (state) => state.questionnaire.questionnaires
  );

  useEffect(() => {
    dispatch(fetchQuestionnaire());
  }, [dispatch]);

  return (
    <Box w={"full"} px={0} borderRadius={"xl"}>
      <Outlet />
    </Box>
  );
};

export default Questionnaire;
