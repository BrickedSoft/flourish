import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Questionnaire } from "../../../../types/Questionnaire";
import ButtonFull from "../../../../components/common/button/ButtonFull";
import { Link } from "react-router-dom";
import { routes } from "../../../../assets/data/routes";

const QuestionnaireCard = ({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}) => {
  const renderedQuestionnaire = () => {
    const questions = questionnaire.questionnaireFields.map(
      ({ question }, index) => {
        if (index >= 2) return null;
        return (
          <Text
            key={index}
            textTransform={"capitalize"}
            fontSize={"lg"}
            color={"font.muted"}
            textOverflow={"ellipsis"}
          >
            {question}
          </Text>
        );
      }
    );

    return (
      <VStack align={"self-start"} spacing={4}>
        {questions}
      </VStack>
    );
  };

  return (
    <Card px={16} py={8} borderRadius={"xl"}>
      <CardHeader pb={2}>
        <Heading
          size="2xl"
          fontWeight={"semibold"}
          textTransform={"capitalize"}
        >
          {questionnaire.name}
        </Heading>
      </CardHeader>
      <CardBody>{renderedQuestionnaire()}</CardBody>
      <CardFooter>
        <Link to={`${routes.questionnaire}/${questionnaire.id}`}>
          <ButtonFull px={"12"} py={"16"} fontSize={"lg"}>
            View Details
          </ButtonFull>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default QuestionnaireCard;
