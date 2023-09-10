import {
  Box,
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
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { questionnaireData } from "../../../../assets/data/dashboard/questionnaire/questionnaire";
import Container from "../../../../components/common/Container";
import ButtonFull from "../../../../components/common/button/ButtonFull";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import { fetchQuestionnaire } from "../../../../store/actions/questionnaireActions";
import QuestionnaireField from "./QuestionnaireField";
import { Questionnaire as QuestionnaireType } from "../../../../types/Questionnaire";

const Questionnaire = ({ questionnaire }: { questionnaire: QuestionnaireType }) => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: questionnaire });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questionnaireFields",
  });

  useEffect(() => {
    dispatch(fetchQuestionnaire());
  }, [dispatch]);

  return (
    <Container w={"full"} mx={24} my={24} mb={64} borderRadius={"xl"}>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2.4rem",
        }}
      >
        <Flex gap={16} justifyContent={"flex-end"}>
          {/* ------------------------------ Reset Button ------------------------------ */}

          <ButtonFull
            isLoading={isSubmitting}
            px={"12"}
            py={"16"}
            fontSize={"lg"}
            type="submit"
            onClick={() =>
              reset({
                ...questionnaire,
              })
            }
          >
            {questionnaireData.button.reset.title}
          </ButtonFull>

          {/* ------------------------------- Save Button ------------------------------ */}

          <ButtonFull
            isLoading={isSubmitting}
            px={"12"}
            py={"16"}
            fontSize={"lg"}
            type="submit"
          >
            {questionnaireData.button.save.title}
          </ButtonFull>
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
              <EditablePreview px={12} py={4} borderColor={"transparent"} />
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

        {/* -------------------------- Questionnaire Fields -------------------------- */}

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
            <QuestionnaireField
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
              {questionnaireData.button.questionnaire.add.icon}
            </Text>
            {questionnaireData.button.questionnaire.add.title}
          </Flex>
        </ButtonFull>
      </form>
    </Container>
  );
};

export default Questionnaire;
