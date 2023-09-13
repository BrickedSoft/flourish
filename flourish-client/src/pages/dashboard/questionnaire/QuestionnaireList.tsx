import { useEffect } from "react";
import { Center, SimpleGrid } from "@chakra-ui/react";

import Spinner from "../../../components/common/Spinner";
import ButtonFull from "../../../components/common/button/ButtonFull";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { fetchQuestionnaire } from "../../../store/actions/questionnaireActions";
import { Status } from "../../../types/Status";
import QuestionnaireCard from "../../../components/questionnaire/QuestionnaireCard";

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
            pb={32}
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
