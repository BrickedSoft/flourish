import { useEffect, useState } from "react";
import { Center, Flex, FormControl, Grid, Text } from "@chakra-ui/react";
import _ from "lodash";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { filledQuestionnaireData } from "../../../../assets/data/dashboard/questionnaire";
import { routes } from "../../../../assets/data/routes";
import Container from "../../../../components/common/Container";
import ButtonFull from "../../../../components/common/button/ButtonFull";
import Buttons from "../../../../components/dashboard/Buttons";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import { QuestionnaireKeys } from "../../../../types/Questionnaire";
import { Status } from "../../../../types/Status";
import RadioField from "./RadioField";
import { submitFilledQuestionnaire } from "../../../../store/actions/questionnaireActions/client";

type FieldType = {
  [key: string]: string;
};

const initialForm: FieldType = {};

const QuestionnaireDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const questionnaire = useAppSelector(
    (state) => state.questionnaire.questionnaires[id as string]
  );
  const status = useAppSelector((state) => state.questionnaire.status);
  const [options, setOptions] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [showEvaluate, setShowEvaluate] = useState<boolean>(false);

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

    return totalPoints;
  };

  const onSubmit = async (data: FieldType) => {
    const totalPoints = onEvaluate(data) + 30;
    let comment: string = "";
    for (let i = 0; i < questionnaire.evaluation_range.length; i++) {
      if (totalPoints < questionnaire.evaluation_range[i].points) {
        comment = questionnaire.evaluation_range[i].name;
        break;
      }
    }

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
  };

  return (
    <Container w={"full"} py={32} borderRadius={"xl"}>
      <FormControl
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        display={"flex"}
        flexDirection={"column"}
        gap={36}
      >
        {/* --------------------------------- Buttons -------------------------------- */}

        <Buttons
          isSubmitting={isSubmitting}
          isDirty={isDirty}
          isValid={isValid}
          reset={reset}
          data={initialForm}
          showButtonEach={[true, false, true]}
        />

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
