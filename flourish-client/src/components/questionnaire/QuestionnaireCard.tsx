import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { routes } from "../../assets/data/routes";

import { useAppDispatch } from "../../hooks/useStore";
import {
  fetchQuestionnaire,
  removeQuestionnaire,
} from "../../store/actions/questionnaireActions";
import { Questionnaire, QuestionnaireKeys } from "../../types/Questionnaire";
import ButtonFull from "../common/button/ButtonFull";

const QuestionnaireCard = ({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

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
      <CardFooter gap={24}>
        <ButtonFull
          as={Link}
          to={`${routes.questionnaire}/${questionnaire.id}`}
          px={20}
          py={18}
          fontSize={"lg"}
        >
          View Details
        </ButtonFull>
        <Button
          px={20}
          py={17}
          fontSize={"lg"}
          variant={"outline"}
          borderRadius={"xl"}
          colorScheme={"red"}
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            const responseRemove = await dispatch(
              removeQuestionnaire({
                id: questionnaire[QuestionnaireKeys.ID] as string,
              })
            );
            const responseFetch = await dispatch(fetchQuestionnaire());
            if (responseRemove.payload && responseFetch.payload) {
              setIsLoading(false);
            }
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionnaireCard;
