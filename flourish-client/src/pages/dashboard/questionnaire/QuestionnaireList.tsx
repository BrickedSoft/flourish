import { useEffect, useState } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  questionnaireData,
  questionnaireList,
} from "../../../assets/data/questionnaire";
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

        const button = (
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
        );

        return (
          <VStack h={"full"} spacing={32} alignItems={"stretch"} pb={32}>
            <SimpleGrid
              spacing={16}
              borderRadius={"xl"}
              templateRows="repeat(auto-fill)"
            >
              {questionnaires.map((questionnaire, index) => (
                <QuestionnaireCard key={index} questionnaire={questionnaire} />
              ))}
            </SimpleGrid>

            {questionnaires.length === 0 ? (
              <VStack as={Center} h={"full"} spacing={24}>
                <Heading
                  fontSize={"5xl"}
                  fontWeight={"semibold"}
                  color={"font.muted3"}
                  letterSpacing={"tight"}
                >
                  {questionnaireList.empty.title}
                </Heading>
                {button}
              </VStack>
            ) : (
              button
            )}
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
              {questionnaireList.error.title}
            </ButtonFull>
          </Center>
        );
    }
  };

  return <>{renderedElements()}</>;
};

export default QuestionnaireList;
