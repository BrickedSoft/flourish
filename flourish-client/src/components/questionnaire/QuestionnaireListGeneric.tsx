import { FC, useEffect, useState } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import _ from "lodash";
import { Link } from "react-router-dom";

import {
  questionnaireData,
  questionnaireList,
} from "../../assets/data/dashboard/questionnaire";
import { routes } from "../../assets/data/routes";
import { useAppSelector } from "../../hooks/useStore";
import { Status } from "../../types/Status";
import QuestionnaireCard from "./QuestionnaireCard";
import Spinner from "../common/Spinner";

type PropsTypes = {
  showAddButton?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showButtons?: boolean;
  isLink?: boolean;
};

const QuestionnaireListGeneric: FC<PropsTypes> = ({
  showAddButton = true,
  showEdit = true,
  showDelete = true,
  showButtons = true,
  isLink = false,
}) => {
  const questionnaires = useAppSelector(
    (state) => state.questionnaire.questionnaires
  );
  const status = useAppSelector((state) => state.questionnaire.status);
  const [firstRender, setFirstRender] = useState(true);

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
          <VStack spacing={32} alignItems={"stretch"} py={32}>
            <SimpleGrid
              spacing={16}
              borderRadius={"xl"}
              templateRows="repeat(auto-fill)"
            >
              {Object.values(questionnaires).map((questionnaire, index) => (
                <QuestionnaireCard
                  key={index}
                  questionnaire={questionnaire}
                  showButtons={showButtons}
                  showEdit={showEdit}
                  showDelete={showDelete}
                  isLink={isLink}
                />
              ))}
            </SimpleGrid>

            {_.isEmpty(questionnaires) ? (
              <VStack as={Center} h={"full"} spacing={24}>
                <Heading
                  fontSize={"5xl"}
                  fontWeight={"semibold"}
                  color={"font.muted3"}
                  letterSpacing={"tight"}
                >
                  {questionnaireList.empty.title}
                </Heading>
                {showAddButton && showButtons && buttonFull}
              </VStack>
            ) : (
              showAddButton &&
              showButtons && (
                <Center position={"sticky"} bottom={32} left={"50%"}>
                  <Tooltip
                    hasArrow
                    label={questionnaireData.button.questionnaire.add.title}
                    bg={"bg.tintsTransparent.2"}
                    fontSize={"md"}
                    color={"status.create"}
                    px={8}
                    py={4}
                    borderRadius={"lg"}
                  >
                    {buttonAdd}
                  </Tooltip>
                </Center>
              )
            )}
          </VStack>
        );

      // case Status.REJECTED:
      //   return (
      //     <Center h={"full"}>
      //       <ButtonFull
      //         colorScheme="red"
      //         onClick={() => {
      //           dispatch(fetchQuestionnaire());
      //         }}
      //       >
      //         {questionnaireList.error.title}
      //       </ButtonFull>
      //     </Center>
      //   );
    }
  };

  return <>{renderedElements()}</>;
};

export default QuestionnaireListGeneric;
