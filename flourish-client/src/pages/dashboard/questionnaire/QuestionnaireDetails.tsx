import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  List,
  Text,
} from "@chakra-ui/react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { questionnaireData } from "../../../assets/data/questionnaire";
import Container from "../../../components/common/Container";
import Spinner from "../../../components/common/Spinner";
import ButtonFull from "../../../components/common/button/ButtonFull";
import EvaluationRangeField from "../../../components/questionnaire/EvaluationRangeField";
import OptionField from "../../../components/questionnaire/OptionField";
import QuestionField from "../../../components/questionnaire/QuestionField";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import {
  createQuestionnaire,
  editQuestion,
  editQuestionnaire,
  fetchQuestionnaire,
  removeQuestion,
  setQuestion,
} from "../../../store/actions/questionnaireActions";
import {
  PutQuestion,
  Questionnaire,
  putQuestionnaireKeys,
} from "../../../types/Questionnaire";
import { Status } from "../../../types/Status";
import { routes } from "../../../assets/data/routes";

const QuestionnaireDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.questionnaire.status);
  const questionnaires = useAppSelector(
    (state) => state.questionnaire.questionnaires
  );
  const questionnaire = _.filter(questionnaires, function (questionnaire) {
    return questionnaire.id === id;
  })[0];
  const [isFirstRender, setIsFirstRender] = useState(true);

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { isDirty, errors, isSubmitting },
  } = useForm({ defaultValues: questionnaire });

  const {
    fields: questionFields,
    append: questionAppend,
    remove: questionRemove,
  } = useFieldArray({
    control,
    name: "questionnaireFields",
  });
  const {
    fields: optionFields,
    append: optionAppend,
    remove: optionRemove,
  } = useFieldArray({
    control,
    name: "options",
  });
  const {
    fields: evaluationFields,
    append: evaluationAppend,
    remove: evaluationRemove,
  } = useFieldArray({
    control,
    name: "evaluation_range",
  });

  useEffect(() => {
    reset(questionnaire);
  }, [questionnaire, reset]);

  /* -------------------------------- onSubmit -------------------------------- */

  const onSubmit = async (data: Questionnaire) => {
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
      ) as Questionnaire;

      const prevQuestionnaire = _.pick(
        questionnaire,
        putQuestionnaireKeys
      ) as Questionnaire;

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
          async (data) => await dispatch(editQuestion(data as PutQuestion))
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
          <Container w={"full"} py={32} borderRadius={"xl"}>
            <FormControl
              as={"form"}
              onSubmit={handleSubmit(onSubmit)}
              display={"flex"}
              flexDirection={"column"}
              gap={36}
            >
              <Flex
                gap={16}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                {/* ------------------------------- Back Button ------------------------------ */}

                <Button
                  isLoading={isSubmitting}
                  px={"12"}
                  py={"1.5rem"}
                  fontSize={"lg"}
                  leftIcon={<ArrowBackIcon />}
                  colorScheme="linkedin"
                  variant="outline"
                  borderRadius={"xl"}
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
                <Flex gap={16} alignItems={"center"}>
                  {/* ------------------------------ Reset Button ------------------------------ */}

                  <Button
                    isLoading={isSubmitting}
                    px={"12"}
                    py={"1.5rem"}
                    fontSize={"lg"}
                    variant={"outline"}
                    borderRadius={"xl"}
                    colorScheme={"linkedin"}
                    isDisabled={!isDirty}
                    onClick={() =>
                      reset({
                        ...questionnaire,
                      })
                    }
                  >
                    {questionnaireData.button.reset.title}
                  </Button>

                  {/* ------------------------------- Save Button ------------------------------ */}

                  <ButtonFull
                    isLoading={isSubmitting}
                    px={"16"}
                    py={"16"}
                    fontSize={"lg"}
                    type={"submit"}
                    isDisabled={!isDirty}
                  >
                    {questionnaireData.button.save.title}
                  </ButtonFull>
                </Flex>
              </Flex>

              {/* --------------------------- Questionnaire Name --------------------------- */}

              <FormControl
                as={Grid}
                isInvalid={errors.name ? true : false}
                gridTemplateColumns={"auto 1fr auto"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={16}
              >
                <FormLabel
                  htmlFor="name"
                  m={0}
                  fontSize={"xl"}
                  color={"font.muted2"}
                  fontWeight={"normal"}
                  whiteSpace={"nowrap"}
                >
                  {questionnaireData.name.title}{" "}
                  <Text as={"span"} fontSize={"2xl"} fontWeight={"medium"}>
                    :
                  </Text>
                </FormLabel>
                <Controller
                  name={"name"}
                  control={control}
                  render={({ field }) => (
                    <Editable
                      id="name"
                      w={"50%"}
                      fontSize={"xl"}
                      value={field.value}
                      placeholder={questionnaireData.name.placeholder}
                    >
                      <>
                        <EditablePreview
                          h={"3.2rem"}
                          display={"flex"}
                          alignItems={"center"}
                          px={12}
                        />
                        <EditableInput
                          type="text"
                          h={"3.2rem"}
                          px={12}
                          borderRadius={"xl"}
                          {...field}
                          {...register("name", {
                            required: "This is required",
                          })}
                        />
                      </>
                    </Editable>
                  )}
                />

                <FormErrorMessage fontSize={"md"}>
                  {errors?.name && (errors?.name?.message as React.ReactNode)}
                </FormErrorMessage>
              </FormControl>

              {/* ------------------------------ Questionnaire ----------------------------- */}

              <Box>
                <Heading
                  mb={4}
                  fontWeight={"semibold"}
                  color={"font.primary"}
                  letterSpacing={"tight"}
                >
                  {questionnaireData.questionnaires}
                </Heading>
                <Divider borderWidth={0.75} />
              </Box>

              <List display={"flex"} flexDir={"column"} gap={16}>
                {questionFields.map((field, index) => (
                  <QuestionField
                    key={field.id}
                    control={control}
                    errors={errors}
                    index={index}
                    register={register}
                    remove={questionRemove}
                    data={field}
                  />
                ))}
              </List>

              <Button
                px={"16"}
                py={"20"}
                fontSize={"lg"}
                alignSelf={"center"}
                colorScheme={"green"}
                borderRadius={"xl"}
                onClick={() => {
                  questionAppend({
                    question: "",
                  });
                }}
              >
                <Flex gap={8} alignItems={"center"}>
                  <Text as={"span"} fontSize={20}>
                    {questionnaireData.button.question.add.icon}
                  </Text>
                  {questionnaireData.button.question.add.title}
                </Flex>
              </Button>

              {/* --------------------------------- Options -------------------------------- */}

              <Box>
                <Heading
                  mb={4}
                  fontWeight={"semibold"}
                  color={"font.primary"}
                  letterSpacing={"tight"}
                >
                  {questionnaireData.options}
                </Heading>
                <Divider borderWidth={0.75} />
              </Box>

              <List display={"flex"} flexDir={"column"} gap={16}>
                {optionFields.map((field, index) => (
                  <OptionField
                    key={field.id}
                    control={control}
                    errors={errors}
                    index={index}
                    register={register}
                    remove={optionRemove}
                    data={field}
                  />
                ))}
              </List>

              <Button
                px={"16"}
                py={"20"}
                fontSize={"lg"}
                alignSelf={"center"}
                colorScheme={"green"}
                borderRadius={"xl"}
                onClick={() => {
                  optionAppend({
                    name: "",
                    points: 0,
                  });
                }}
              >
                <Flex gap={8} alignItems={"center"}>
                  <Text as={"span"} fontSize={20}>
                    {questionnaireData.button.option.add.icon}
                  </Text>
                  {questionnaireData.button.option.add.title}
                </Flex>
              </Button>

              {/* ---------------------------- Evaluation Range ---------------------------- */}

              <Box>
                <Heading
                  mb={4}
                  fontWeight={"semibold"}
                  color={"font.primary"}
                  letterSpacing={"tight"}
                >
                  {questionnaireData.evaluationRange}
                </Heading>
                <Divider borderWidth={0.75} />
              </Box>

              <List display={"flex"} flexDir={"column"} gap={16}>
                {evaluationFields.map((field, index) => (
                  <EvaluationRangeField
                    key={field.id}
                    control={control}
                    errors={errors}
                    index={index}
                    register={register}
                    remove={evaluationRemove}
                    data={field}
                  />
                ))}
              </List>

              <Button
                px={"16"}
                py={"20"}
                fontSize={"lg"}
                alignSelf={"center"}
                colorScheme={"green"}
                borderRadius={"xl"}
                onClick={() => {
                  evaluationAppend({
                    name: "",
                    points: 0,
                  });
                }}
              >
                <Flex gap={8} alignItems={"center"}>
                  <Text as={"span"} fontSize={20}>
                    {questionnaireData.button.evaluationRange.add.icon}
                  </Text>
                  {questionnaireData.button.evaluationRange.add.title}
                </Flex>
              </Button>
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
