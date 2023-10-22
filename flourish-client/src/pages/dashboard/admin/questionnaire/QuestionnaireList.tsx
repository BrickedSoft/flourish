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
import { Link } from "react-router-dom";

import {
  questionnaireData,
  questionnaireList,
} from "../../../../assets/data/dashboard/questionnaire";
import { routes } from "../../../../assets/data/routes";
import Spinner from "../../../../components/common/Spinner";
import ButtonFull from "../../../../components/common/button/ButtonFull";
import QuestionnaireCard from "../../../../components/questionnaire/QuestionnaireCard";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import { fetchQuestionnaire } from "../../../../store/actions/questionnaireActions";
import { Status } from "../../../../types/Status";

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

  useEffect(() => {
    if (status === Status.FULFILLED || status === Status.REJECTED)
      setFirstRender(false);
  }, [status]);

  const renderedElements = () => {
    switch (status) {
      case Status.PENDING:
      case Status.FULFILLED:
        if (firstRender) {
          return (
            <Center h={"full"}>
              <Spinner />
            </Center>
          );
        }

        const buttonFull = (
          <Button
            as={Link}
            px={"16"}
            py={"20"}
            fontSize={"lg"}
            alignSelf={"center"}
            colorScheme={"green"}
            borderRadius={"xl"}
            to={routes.createQuestionnaire}
          >
            <Flex gap={8} alignItems={"center"}>
              <Text as={"span"} fontSize={20}>
                {questionnaireData.button.questionnaire.add.icon}
              </Text>
              {questionnaireData.button.questionnaire.add.title}
            </Flex>
          </Button>
        );

        const buttonAdd = (
          <Button
            as={Link}
            boxSize={"48px"}
            fontSize={32}
            borderRadius={"full"}
            alignSelf={"center"}
            variant={"solid"}
            colorScheme="green"
            to={routes.createQuestionnaire}
            boxShadow={"0px 12px 24px rgba(0, 0, 0, 0.25)"}
            transition={"all 0.3s ease-in-out"}
          >
            {questionnaireData.button.questionnaire.add.icon}
          </Button>
        );

        return (
          <VStack
            position={"relative"}
            h={"full"}
            spacing={32}
            alignItems={"stretch"}
            pb={32}
          >
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
                {buttonFull}
              </VStack>
            ) : (
              <Center position={"sticky"} bottom={0} left={"50%"}>
                {buttonAdd}
              </Center>
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
