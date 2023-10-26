import { FC, useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  FormControl,
  Grid,
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
import { useNavigate, useParams } from "react-router-dom";

import { filledQuestionnaireData } from "../../assets/data/dashboard/questionnaire";
import { routes } from "../../assets/data/routes";
import Container from "../common/Container";
import ButtonFull from "../common/button/ButtonFull";
import Buttons from "../dashboard/Buttons";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { submitFilledQuestionnaire } from "../../store/actions/questionnaireActions/client";
import { QuestionnaireKeys } from "../../types/Questionnaire";
import { Status } from "../../types/Status";
import RadioField from "../../pages/dashboard/client/questionnaire/RadioField";

type FieldType = {
  [key: string]: string;
};

type PropsType = {
  id: string;
  filled?: FieldType;
  questionOptions: string[];
};

const initialForm: FieldType = {};

const QuestionnaireDetails: FC<PropsType> = ({
  id,
  filled = initialForm,
  questionOptions = [],
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const questionnaire = useAppSelector(
    (state) => state.questionnaire.questionnaires[id as string]
  );
  const status = useAppSelector((state) => state.questionnaire.status);
  const [options, setOptions] = useState<string[]>(questionOptions);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [showEvaluate, setShowEvaluate] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (status === Status.FULFILLED && !questionnaire) navigate(routes[404]);
    if (questionnaire && questionnaire.options) {
      setOptions(_.map(questionnaire.options, "name"));
    }
  }, [questionnaire, navigate, status]);

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { isDirty, errors, isSubmitting, dirtyFields },
  } = useForm({ defaultValues: initialForm });
  const watchAllFields = useWatch({ control });

  const totalDirtyFields = Object.keys(dirtyFields).length;

  useEffect(() => {
    if (questionnaire) {
      setIsValid(
        questionnaire[QuestionnaireKeys.QUESTIONNAIRE_FIELDS].length ===
          totalDirtyFields
      );
      setShowEvaluate(
        questionnaire[QuestionnaireKeys.QUESTIONNAIRE_FIELDS].length ===
          totalDirtyFields
      );
    }
  }, [questionnaire, totalDirtyFields, watchAllFields]);

  const onEvaluate = (data?: FieldType) => {
    const questionnaireOptions = _.keyBy(questionnaire.options, "name");

    let totalPoints = 0;
    _.map(data || watchAllFields, (value) => {
      totalPoints += questionnaireOptions[value as string].points;
    });

    setTotalPoints(totalPoints);

    let comment: string = "";
    for (let i = 0; i < questionnaire.evaluation_range.length; i++) {
      if (totalPoints < questionnaire.evaluation_range[i].points) {
        comment = questionnaire.evaluation_range[i].name;
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
        questionnaire,
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

        <Box
          position={"sticky"}
          pt={32}
          pb={16}
          top={0}
          zIndex={50}
          bg={"white"}
        >
          <Buttons
            isSubmitting={isSubmitting}
            isDirty={isDirty}
            isValid={isValid}
            reset={reset}
            data={initialForm}
            showButtonEach={[true, false, true]}
          >
            {totalPoints !== 0 && (
              <Text
                fontSize={"lg"}
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
        </Box>

        {questionnaire && (
          <Grid
            templateColumns={"auto 1fr"}
            columnGap={64}
            rowGap={40}
            alignItems={"center"}
            pb={32}
          >
            {questionnaire[QuestionnaireKeys.QUESTIONNAIRE_FIELDS].map(
              ({ question, id }) => (
                <RadioField
                  key={id}
                  register={register}
                  errors={errors}
                  data={{
                    title: question,
                    placeholder: "select",
                    fieldName: id as string,
                  }}
                  options={options}
                  control={control}
                />
              )
            )}
          </Grid>
        )}
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
                Your score is:{" "}
                <Text as={"span"} fontWeight={"medium"}>
                  {totalPoints}
                </Text>
              </Text>
              <Text>
                Your symptoms are{" "}
                <Text as={"span"} fontWeight={"medium"}>
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
