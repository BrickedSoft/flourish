import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Questionnaire } from "../../types/Questionnaire";
import ButtonFull from "../common/button/ButtonFull";
import { Link } from "react-router-dom";
import { routes } from "../../assets/data/routes";

const QuestionnaireCard = ({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}) => {
  const renderedQuestionnaire = () => {
    const maxQuestions = 3;

    const questions = questionnaire.questionnaireFields.map(
      ({ question }, index) => {
        if (index >= maxQuestions) return null;
        return (
          <Text
            key={index}
            textTransform={"capitalize"}
            fontSize={"lg"}
            color={"font.muted"}
            textOverflow={"ellipsis"}
            style={{
              lineClamp: 1,
            }}
          >
            {index !== maxQuestions - 1 ? (
              question
            ) : (
              <Text as={"span"} letterSpacing={"widest"}>
                ...
              </Text>
            )}
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
    <Card
      px={16}
      py={8}
      border={"2px solid #e9f2fd"}
      borderRadius={"xl"}
      boxShadow={"none"}
    >
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
        <ButtonFull
          as={Link}
          to={`${routes.questionnaire}/${questionnaire.id}`}
          px={20}
          py={18}
          fontSize={"lg"}
        >
          View Details
        </ButtonFull>
      </CardFooter>
    </Card>
  );
};

export default QuestionnaireCard;
