import {
  Button,
  Center,
  Flex,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { questionnaireData } from "../../../assets/data/questionnaire";
import Spinner from "../../../components/common/Spinner";
import ButtonFull from "../../../components/common/button/ButtonFull";
import QuestionnaireCard from "../../../components/questionnaire/QuestionnaireCard";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { fetchQuestionnaire } from "../../../store/actions/questionnaireActions";
import { Status } from "../../../types/Status";
import { Link } from "react-router-dom";
import { routes } from "../../../assets/data/routes";

const QuestionnaireList = () => {
  const dispatch = useAppDispatch();
  const questionnaires = useAppSelector(
    (state) => state.questionnaire.questionnaires
  );
  const status = useAppSelector((state) => state.questionnaire.status);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    dispatch(fetchQuestionnaire());
  }, [dispatch]);

  const renderedElements = () => {
    switch (status) {
      case Status.PENDING:
      case Status.FULFILLED:
        if (firstRender) {
          setFirstRender(false);
          return (
            <Center h={"full"}>
              <Spinner />
            </Center>
          );
        }

        return (
          <VStack spacing={32} alignItems={"stretch"} pb={32}>
            <SimpleGrid
              spacing={16}
              borderRadius={"xl"}
              templateRows="repeat(auto-fill)"
            >
              {questionnaires.map((questionnaire, index) => (
                <QuestionnaireCard key={index} questionnaire={questionnaire} />
              ))}
            </SimpleGrid>

            <Button
              as={Link}
              px={"16"}
              py={"20"}
              fontSize={"lg"}
              alignSelf={"center"}
              colorScheme={"green"}
              borderRadius={"xl"}
              to={`${routes.questionnaire}/new`}
            >
              <Flex gap={8} alignItems={"center"}>
                <Text as={"span"} fontSize={20}>
                  {questionnaireData.button.questionnaire.add.icon}
                </Text>
                {questionnaireData.button.questionnaire.add.title}
              </Flex>
            </Button>
          </VStack>
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
