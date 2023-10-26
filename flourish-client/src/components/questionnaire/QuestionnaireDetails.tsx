import { FC, useEffect, useState } from "react";
import {
  Center,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { filledQuestionnaireData } from "../../assets/data/dashboard/questionnaire";
import { useAppDispatch } from "../../hooks/useStore";
import { submitFilledQuestionnaire } from "../../store/actions/questionnaireActions/client";
import {
  OptionAndEvaluationRangeTypes,
  QuestionnaireTypes,
} from "../../types/Questionnaire";
import Container from "../common/Container";
import ButtonFull from "../common/button/ButtonFull";
import Buttons from "../dashboard/Buttons";
import RadioField from "./RadioField";

type FieldType = {
  [key: string]: string;
};

type QuestionType = {
  id: string;
  question: string;
  answer?: string;
};

type PropsType = {
  questions: QuestionType[];
  questionnaire?: QuestionnaireTypes;
  options: OptionAndEvaluationRangeTypes[];
  evaluationRange?: OptionAndEvaluationRangeTypes[];
  isReadOnly?: boolean;
  totalPoints?: number;
  comment?: string;
  showButtonEach?: boolean[];
};

const initialForm: FieldType = {};

type FieldHeadingType = {
  title: string;
  [key: string]: string | number;
};

const FieldHeading: FC<FieldHeadingType> = ({ title, ...rest }) => {
  return (
    <Heading
      as={"h1"}
      fontSize={"xl"}
      color={"font.heroLight"}
      fontWeight={"medium"}
      textShadow={"0 0.2rem 0.4rem rgba(28, 126, 214, 0.25)"}
      textAlign={"center"}
      {...rest}
    >
      {title}
    </Heading>
  );
};

const QuestionnaireDetails: FC<PropsType> = ({
  questions = [],
  questionnaire,
  options = [],
  evaluationRange = [],
  isReadOnly = false,
  totalPoints: totalPointsInitial = 0,
  comment: commentInitial = "None",
  showButtonEach = [true, false, true],
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const status = useAppSelector((state) => state.questionnaire.status);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [totalPoints, setTotalPoints] = useState<number>(totalPointsInitial);
  const [comment, setComment] = useState<string>(commentInitial);
  const [showEvaluate, setShowEvaluate] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fieldOptions = _.map(options, "name");

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, errors, isSubmitting, dirtyFields },
  } = useForm({ defaultValues: initialForm });
  const watchAllFields = useWatch({ control });

  const totalDirtyFields = Object.keys(dirtyFields).length;

  useEffect(() => {
    if (questions.length > 0 && totalDirtyFields > 0) {
      setIsValid(questions?.length === totalDirtyFields);
      setShowEvaluate(questions?.length === totalDirtyFields);
    }
  }, [questions, totalDirtyFields, watchAllFields]);

  const onEvaluate = (data?: FieldType) => {
    const questionnaireOptions = _.keyBy(options, "name");

    let totalPoints = 0;
    _.map(data || watchAllFields, (value) => {
      totalPoints += questionnaireOptions[value as string].points;
    });

    setTotalPoints(totalPoints);

    let comment: string = "";
    for (let i = 0; i < evaluationRange.length; i++) {
      if (totalPoints < evaluationRange[i].points) {
        comment = evaluationRange[i].name;
        break;
      }
    }

    setComment(comment);

    return {
      totalPoints,
      comment,
    };
  };

  const onSubmit = async (data: FieldType) => {
    const { totalPoints, comment } = onEvaluate();

    dispatch(
      submitFilledQuestionnaire({
        questionnaire: questionnaire as QuestionnaireTypes,
        filled: data,
        comment: {
          points: totalPoints,
          name: comment,
        },
      })
    );

    navigate(-1);
  };

  return (
    <Container w={"full"} pb={32} borderRadius={"xl"}>
      <FormControl
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        display={"flex"}
        flexDirection={"column"}
        gap={36}
      >
        {/* --------------------------------- Buttons -------------------------------- */}

        <Flex
          position={"sticky"}
          flexDir={"column"}
          pt={32}
          pb={16}
          top={0}
          zIndex={50}
          bg={"white"}
          gap={48}
        >
          <Buttons
            isSubmitting={isSubmitting}
            isDirty={isDirty}
            isValid={isValid}
            reset={reset}
            data={initialForm}
            titles={["Back", "", "Submit"]}
            showButtonEach={showButtonEach}
          >
            {totalPoints !== 0 && (
              <Text
                fontSize={"xl"}
                color={"font.heroLight"}
                fontWeight={"medium"}
                textShadow={"0 0.2rem 0.4rem rgba(28, 126, 214, 0.25)"}
              >
                Your score is{" "}
                <Text as={"span"} fontWeight={"bold"}>
                  {totalPoints}
                </Text>
                <Text as={"span"}>
                  {" "}
                  which is{" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    {comment}
                  </Text>
                </Text>
              </Text>
            )}
          </Buttons>

          <Grid
            templateColumns={"minmax(auto, 1fr) minmax(auto, 2fr)"}
            columnGap={128}
            rowGap={40}
            alignItems={"center"}
          >
            <GridItem justifySelf={"start"} alignSelf={"start"}>
              <FieldHeading
                title={filledQuestionnaireData.fieldNames.question}
                fontSize={"2xl"}
              />
            </GridItem>

            <GridItem
              as={Grid}
              gridTemplateColumns={`repeat(${fieldOptions.length}, 1fr)`}
              gap={24}
              justifyContent={"center"}
              alignItems={"start"}
            >
              {fieldOptions.map((title, index) => (
                <FieldHeading key={index} title={title} />
              ))}
            </GridItem>
          </Grid>
        </Flex>

        <Grid
          templateColumns={"minmax(auto, 1fr) minmax(auto, 2fr)"}
          columnGap={128}
          rowGap={40}
          alignItems={"center"}
          mt={-36}
          pb={32}
        >
          {_.map(questions, ({ question, id, answer }) => (
            <RadioField
              key={id}
              errors={errors}
              data={{
                title: question,
                placeholder: "select",
                fieldName: id as string,
              }}
              options={fieldOptions}
              control={control}
              value={answer}
              isReadOnly={isReadOnly}
            />
          ))}
        </Grid>
      </FormControl>

      <AnimatePresence>
        {showEvaluate && (
          <Center
            display={"inline-block"}
            as={motion.div}
            position={"absolute"}
            bottom={36}
            left={"55%"}
            boxShadow={"lg"}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            variants={evaluateButtonVariants}
          >
            <ButtonFull
              onClick={() => {
                onEvaluate();
                onOpen();
                setShowEvaluate(false);
              }}
            >
              <Flex gap={4} alignItems={"center"}>
                {filledQuestionnaireData.button.evaluate.icon}
                <Text>{filledQuestionnaireData.button.evaluate.title}</Text>
              </Flex>
            </ButtonFull>
          </Center>
        )}
      </AnimatePresence>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent py={24} as={VStack} spacing={16} borderRadius={"lg"}>
          <ModalHeader>
            <Heading>{filledQuestionnaireData.evaluation.title}</Heading>
          </ModalHeader>
          <ModalCloseButton size={"lg"} />
          <ModalBody>
            <VStack fontSize={"xl"}>
              <Text>
                {filledQuestionnaireData.evaluation.score}
                <Text
                  as={"span"}
                  fontWeight={"medium"}
                  color={"font.heroLight"}
                >
                  {totalPoints}
                </Text>
              </Text>
              <Text>
                {filledQuestionnaireData.evaluation.comment}
                <Text
                  as={"span"}
                  fontWeight={"medium"}
                  color={"font.heroLight"}
                >
                  {comment}
                </Text>
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <ButtonFull fontSize={"lg"} py={16} px={16} onClick={onClose}>
              Close
            </ButtonFull>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default QuestionnaireDetails;

const evaluateButtonVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: {
      type: "spring",
      bounce: 0.3,
    },
  },
};
