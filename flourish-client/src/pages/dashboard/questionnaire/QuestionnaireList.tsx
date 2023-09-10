import { Box, Center, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { fetchQuestionnaire } from "../../../store/actions/questionnaireActions";
import QuestionnaireCard from "./components/QuestionnaireCard";
import { Outlet } from "react-router-dom";
import { Status } from "../../../types/Status";
import Spinner from "../../../components/common/Spinner";
import ButtonFull from "../../../components/common/button/ButtonFull";

const QuestionnaireList = () => {
  const dispatch = useAppDispatch();
  const questionnaires = useAppSelector(
    (state) => state.questionnaire.questionnaires
  );
  const status = useAppSelector((state) => state.questionnaire.status);

  useEffect(() => {
    dispatch(fetchQuestionnaire());
  }, [dispatch]);

  const renderedElements = () => {
    switch (status) {
      case Status.PENDING:
        return (
          <Center h={"full"}>
            <Spinner />
          </Center>
        );

      case Status.FULFILLED:
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

      case Status.REJECTED:
        return (
          <Center h={"full"}>
            <ButtonFull
              colorScheme="red"
              onClick={() => {
                dispatch(fetchQuestionnaire());
              }}
            >
              Try Again
            </ButtonFull>
          </Center>
        );
    }
  };

  return <>{renderedElements()}</>;
};

export default QuestionnaireList;
