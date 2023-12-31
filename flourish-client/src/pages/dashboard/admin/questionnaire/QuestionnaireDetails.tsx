import { useState } from "react";
import { Box, Center, Flex, FormControl, Heading } from "@chakra-ui/react";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { routes } from "../../../../assets/data/routes";
import Container from "../../../../components/common/Container";
import Spinner from "../../../../components/common/Spinner";
import ButtonFull from "../../../../components/common/button/ButtonFull";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import {
  createQuestionnaire,
  editQuestion,
  editQuestionnaire,
  fetchQuestionnaire,
  removeQuestion,
  setQuestion,
} from "../../../../store/actions/questionnaireActions/admin";
import {
  PutQuestionTypes,
  QuestionnaireTypes,
  putQuestionnaireKeys,
} from "../../../../types/Questionnaire";
import { Status } from "../../../../types/Status";
import { EvaluationFields } from "./EvaluationFields";
import OptionFields from "./OptionFields";
import QuestionFields from "./QuestionFields";
import QuestionnaireName from "./QuestionnaireName";
import Buttons from "../../../../components/dashboard/ButtonGroup";

const QuestionnaireDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.questionnaire.status);
  const questionnaire = useAppSelector((state) => {
    const questionnaires = state.questionnaire.questionnaires;
    const filteredQuestionnaires = _.filter(questionnaires, (questionnaire) => {
      return questionnaire.id === id;
    })[0];
    return filteredQuestionnaires;
  });
  const [isFirstRender, setIsFirstRender] = useState(true);

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { isDirty, errors, isSubmitting, isValid },
  } = useForm({ defaultValues: questionnaire });

  // useEffect(() => {
  //   reset(questionnaire);
  // }, [questionnaire, reset]);

  /* -------------------------------- onSubmit -------------------------------- */

  const onSubmit = async (data: QuestionnaireTypes) => {
    /* -------------------------- Create Questionnaire -------------------------- */

    if (!data.id) {
      const response = (await dispatch(createQuestionnaire(data))) as any;
      if (response?.payload?.data?.id)
        navigate(`${routes.questionnaire}/${response.payload.data.id}`);
    } else {
      /* --------------------------- Edit Questionnaire --------------------------- */

      const modifiedQuestionnaire = _.pick(
        data,
        putQuestionnaireKeys
      ) as QuestionnaireTypes;

      const prevQuestionnaire = _.pick(
        questionnaire,
        putQuestionnaireKeys
      ) as QuestionnaireTypes;

      if (!_.isEqual(modifiedQuestionnaire, prevQuestionnaire))
        dispatch(editQuestionnaire(modifiedQuestionnaire));

      /* ---------------------------- Create Questions ---------------------------- */

      const newQuestions = _.reject(data.questionnaireFields, "id");
      if (newQuestions.length > 0)
        _.map(
          newQuestions,
          async ({ question }) =>
            await dispatch(
              setQuestion({
                question,
                questionnaire: data.id as string,
              })
            )
        );

      /* ----------------------------- Edit Questions ----------------------------- */

      const editedQuestions = _.intersectionWith(
        data.questionnaireFields,
        questionnaire.questionnaireFields,
        (question1, questions2) =>
          question1.id === questions2.id &&
          question1.question !== questions2.question
      );

      if (editedQuestions.length > 0)
        _.map(
          editedQuestions,
          async (data) => await dispatch(editQuestion(data as PutQuestionTypes))
        );

      /* ----------------------------- Delete Questions ---------------------------- */

      const deletedQuestions = _.differenceBy(
        questionnaire.questionnaireFields,
        data.questionnaireFields,
        "id"
      );
      if (deletedQuestions.length > 0)
        _.map(
          deletedQuestions,
          async ({ id }) =>
            await dispatch(
              removeQuestion({
                id: id as string,
              })
            )
        );
    }

    await dispatch(fetchQuestionnaire());
    reset(data);
  };

  const renderedElements = () => {
    switch (status) {
      /* -------------------------------------------------------------------------- */
      /*                                   Pending                                  */
      /*                                  Fulfilled                                 */
      /* -------------------------------------------------------------------------- */

      case Status.PENDING:
      case Status.FULFILLED:
        if (isFirstRender) {
          setIsFirstRender(false);
          return (
            <Center h={"full"}>
              <Spinner />
            </Center>
          );
        }

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
                flexDir={"column"}
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
                  data={questionnaire}
                />
              </Box>

              {/* --------------------------- Questionnaire Name --------------------------- */}

              <QuestionnaireName
                control={control}
                errors={errors}
                register={register}
              />

              {/* ------------------------------ Questionnaire ----------------------------- */}

              <QuestionFields
                control={control}
                errors={errors}
                register={register}
              />

              {/* --------------------------------- Options -------------------------------- */}

              <OptionFields
                control={control}
                errors={errors}
                register={register}
              />

              {/* ---------------------------- Evaluation Range ---------------------------- */}

              <EvaluationFields
                control={control}
                errors={errors}
                register={register}
              />
            </FormControl>
          </Container>
        );

      /* -------------------------------------------------------------------------- */
      /*                                  Rejected                                  */
      /* -------------------------------------------------------------------------- */

      case Status.REJECTED:
        return (
          <Center as={Flex} flexDir={"column"} h={"full"} gap={24}>
            <Heading fontSize={"4xl"} fontWeight={"semibold"} color={"error"}>
              Something went wrong...
            </Heading>
            <ButtonFull
              colorScheme={"error"}
              onClick={() => {
                dispatch(fetchQuestionnaire());
              }}
            >
              Reload
            </ButtonFull>
          </Center>
        );
    }
  };

  return <>{renderedElements()}</>;
};

export default QuestionnaireDetails;
