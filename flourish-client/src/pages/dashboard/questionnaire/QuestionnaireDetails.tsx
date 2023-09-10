import { useEffect } from "react";
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
  Heading,
  List,
  Text,
} from "@chakra-ui/react";
import _ from "lodash";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { questionnaireData } from "../../../assets/data/questionnaire/questionnaire";
import Container from "../../../components/common/Container";
import Spinner from "../../../components/common/Spinner";
import ButtonFull from "../../../components/common/button/ButtonFull";
import QuestionField from "../../../components/questionnaire/QuestionField";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import {
  fetchQuestionnaire,
  removeQuestion,
  setQuestion,
} from "../../../store/actions/questionnaireActions";
import { Questionnaire } from "../../../types/Questionnaire";
import { Status } from "../../../types/Status";

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

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: questionnaire });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "questionnaireFields",
  });

  useEffect(() => {
    replace(questionnaire.questionnaireFields);
  }, [questionnaire, replace]);

  const onSubmit = async (data: Questionnaire) => {
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

    const deletedQuestions = _.differenceWith(
      questionnaire.questionnaireFields,
      data.questionnaireFields,
      _.isEqual
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

    await dispatch(fetchQuestionnaire());
    replace(data.questionnaireFields);
  };

  const renderedElements = () => {
    switch (status) {
      /* -------------------------------------------------------------------------- */
      /*                                   Pending                                  */
      /* -------------------------------------------------------------------------- */

      case Status.PENDING:
        return (
          <Center h={"full"}>
            <Spinner />
          </Center>
        );

      /* -------------------------------------------------------------------------- */
      /*                                  Fulfilled                                 */
      /* -------------------------------------------------------------------------- */

      case Status.FULFILLED:
        return (
          <Container w={"full"} py={32} borderRadius={"xl"}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2.4rem",
              }}
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
                  >
                    {questionnaireData.button.save.title}
                  </ButtonFull>
                </Flex>
              </Flex>

              {/* --------------------------- Questionnaire Name --------------------------- */}

              <FormControl
                isInvalid={errors.name ? true : false}
                display={"grid"}
                gridTemplateColumns={"1fr auto"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={"8"}
              >
                <Flex alignItems={"baseline"} gap={"8"}>
                  <FormLabel
                    htmlFor="name"
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
                  <Editable
                    id="name"
                    w={"50%"}
                    fontSize={"xl"}
                    borderWidth={"2"}
                    borderColor={"transparent"}
                    borderRadius={"xl"}
                    defaultValue={
                      questionnaire?.name || questionnaireData.name.placeholder
                    }
                  >
                    <EditablePreview
                      px={12}
                      py={4}
                      borderColor={"transparent"}
                    />
                    <EditableInput
                      type="text"
                      px={12}
                      py={4}
                      {...register("name", {
                        required: "This is required",
                      })}
                    />
                  </Editable>
                </Flex>
                <FormErrorMessage fontSize={"md"}>
                  {errors?.name && (errors?.name?.message as React.ReactNode)}
                </FormErrorMessage>
              </FormControl>

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

              {/* ------------------------------ Questionnaire ----------------------------- */}

              <List display={"flex"} flexDir={"column"} gap={16}>
                {fields.map((field, index) => (
                  <QuestionField
                    key={field.id}
                    errors={errors}
                    index={index}
                    register={register}
                    remove={remove}
                    data={field}
                  />
                ))}
              </List>

              <ButtonFull
                px={"16"}
                py={"20"}
                fontSize={"lg"}
                alignSelf={"center"}
                bg={"green.400"}
                _hover={{ bg: "green.500" }}
                onClick={() => {
                  append({
                    question: "",
                  });
                }}
              >
                <Flex gap={4} alignItems={"center"}>
                  <Text as={"span"} fontSize={20}>
                    {questionnaireData.button.question.add.icon}
                  </Text>
                  {questionnaireData.button.question.add.title}
                </Flex>
              </ButtonFull>
            </form>
          </Container>
        );

      /* -------------------------------------------------------------------------- */
      /*                                  Rejected                                  */
      /* -------------------------------------------------------------------------- */

      case Status.REJECTED:
        return (
          <Center h={"full"}>
            <ButtonFull
              colorScheme="red"
              onClick={() => {
                dispatch(fetchQuestionnaire());
              }}
            >
              Try Again
            </ButtonFull>
          </Center>
        );
    }
  };

  return <>{renderedElements()}</>;
};

export default QuestionnaireDetails;
