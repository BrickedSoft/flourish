import { FC } from "react";
import { Button, Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import _ from "lodash";
import { Link } from "react-router-dom";

import { filledQuestionnaireData } from "../../assets/data/dashboard/questionnaire";
import { routes } from "../../assets/data/routes";
import {
  GetFilledQuestionnaireTypes,
  QuestionnaireTypes,
} from "../../types/Questionnaire";
import FilledQuestionnaireCard from "../../pages/dashboard/client/filledQuestionnaire/FilledQuestionnaireCard";

type FilledQuestionnaireType = {
  [key: string]: GetFilledQuestionnaireTypes;
};

type QuestionnaireType = {
  [key: string]: QuestionnaireTypes;
};

type PropsType = {
  filledQuestionnaires: FilledQuestionnaireType;
  questionnaires: QuestionnaireType;
  showAddButton?: boolean;
};

const FilledQuestionnaireListGeneric: FC<PropsType> = ({
  filledQuestionnaires,
  questionnaires,
  showAddButton = true,
}) => {
  const buttonFull = (
    <Button
      as={Link}
      px={"16"}
      py={"20"}
      fontSize={"lg"}
      alignSelf={"center"}
      colorScheme={"green"}
      borderRadius={"xl"}
      to={routes.questionnaire}
    >
      <Flex gap={8} alignItems={"center"}>
        <Text as={"span"} fontSize={20}>
          {filledQuestionnaireData.button.fill.icon}
        </Text>
        {filledQuestionnaireData.button.fill.title}
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
      to={routes.questionnaire}
      boxShadow={"0px 12px 24px rgba(0, 0, 0, 0.25)"}
      transition={"all 0.3s ease-in-out"}
    >
      {filledQuestionnaireData.button.fill.icon}
    </Button>
  );

  return (
    <VStack w={"full"} h={"full"} py={32} spacing={24} alignItems={"stretch"}>
      {Object.values(filledQuestionnaires).map((data, index) => (
        <FilledQuestionnaireCard
          key={index}
          data={{ ...data, name: questionnaires[data.questionnaire]?.name }}
        />
      ))}

      {_.isEmpty(filledQuestionnaires) ? (
        <VStack as={Center} h={"full"} spacing={24}>
          <Heading
            fontSize={"5xl"}
            fontWeight={"semibold"}
            color={"font.muted3"}
            letterSpacing={"tight"}
          >
            {filledQuestionnaireData.empty.title}
          </Heading>
          {showAddButton && buttonFull}
        </VStack>
      ) : (
        showAddButton && (
          <Center
            position={"sticky"}
            bottom={0}
            left={"50%"}
            transform={"translateY(-50%)"}
            pt={16}
          >
            {buttonAdd}
          </Center>
        )
      )}
    </VStack>
  );
};

export default FilledQuestionnaireListGeneric;
