import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
  VStack,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import { AnimatePresence, isValidMotionProp, motion } from "framer-motion";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { VscChevronDown } from "react-icons/vsc";
import { Link } from "react-router-dom";

import { routes } from "../../assets/data/routes";
import { useAppDispatch } from "../../hooks/useStore";
import {
  fetchQuestionnaire,
  removeQuestionnaire,
} from "../../store/actions/questionnaireActions/admin";
import theme from "../../theme/theme";
import {
  QuestionnaireTypes,
  QuestionnaireKeys,
} from "../../types/Questionnaire";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const QuestionnaireCard = ({
  questionnaire,
}: {
  questionnaire: QuestionnaireTypes;
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const baseQuestions = 3;

  const renderedQuestionnaire = () => {
    const maxQuestions = isExpanded
      ? questionnaire.questionnaireFields.length
      : baseQuestions;

    const questions = questionnaire.questionnaireFields.map(
      ({ question }, index) => {
        if (index >= maxQuestions) return null;
        return (
          <Text
            key={index}
            as={motion.p}
            textTransform={"capitalize"}
            fontSize={"lg"}
            color={"font.muted"}
            textOverflow={"ellipsis"}
            style={{
              lineClamp: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
    <AnimatePresence initial={false}>
      <ChakraBox
        layout
        //@ts-ignore
        transition={{
          layout: {
            type: "spring",
            bounce: 0.3,
            opacity: { delay: 0.2 },
          },
        }}
      >
        <Card
          px={24}
          py={16}
          border={"2px solid #e9f2fd"}
          borderRadius={"xl"}
          boxShadow={"none"}
        >
          <CardHeader
            as={motion.div}
            layout={"position"}
            display={"flex"}
            pb={2}
            justifyContent={"space-between"}
          >
            <Heading
              size="2xl"
              color={"font.general"}
              fontWeight={"semibold"}
              textTransform={"capitalize"}
              letterSpacing={"tight"}
            >
              {questionnaire.name}
            </Heading>
            <Flex gap={24}>
              <Button
                as={Link}
                to={`${routes.questionnaire}/${questionnaire.id}`}
                boxSize={"36px"}
                borderRadius={"lg"}
                variant={"outline"}
                colorScheme={"linkedin"}
              >
                <IoCreateOutline fontSize={"20px"} />
              </Button>
              <Button
                boxSize={"36px"}
                borderRadius={"lg"}
                variant={"outline"}
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
                <IoTrashOutline fontSize={"20px"} />
              </Button>
            </Flex>
          </CardHeader>

          <CardBody>{renderedQuestionnaire()}</CardBody>
          {questionnaire.questionnaireFields.length > baseQuestions && (
            <CardFooter justifyContent={"center"} p={0}>
              <Box
                as={motion.div}
                fontSize={28}
                initial="visible"
                animate={"visible"}
                whileHover="hover"
                variants={downArrowVariants}
                custom={isExpanded}
                cursor={"pointer"}
                onClick={() => setIsExpanded((prev) => !prev)}
                layout={"preserve-aspect"}
              >
                <VscChevronDown />
              </Box>
            </CardFooter>
          )}
        </Card>
      </ChakraBox>
    </AnimatePresence>
  );
};

export default QuestionnaireCard;

const transitionTween = {
  duration: 0.3,
  type: "tween",
};

const downArrowVariants = {
  visible: (isExpanded: boolean) => ({
    rotate: isExpanded ? 180 : 360,
    scale: 1,
    color: theme.colors.font.muted2,
    transition: { ...transitionTween },
  }),
  hover: {
    scale: 1.1,
    color: theme.colors.font.primary,
    transition: {
      ...transitionTween,
    },
  },
};
