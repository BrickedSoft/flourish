import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  List,
  Text,
} from "@chakra-ui/react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";

import { questionnaireData } from "../../../../assets/data/dashboard/questionnaire";
import QuestionField from "../../../../components/questionnaire/QuestionField";
import { Questionnaire } from "../../../../types/Questionnaire";

const QuestionFields = ({
  control,
  errors,
  register,
}: {
  control: Control<Questionnaire>;
  errors: FieldErrors<Questionnaire>;
  register: UseFormRegister<Questionnaire>;
}) => {
  const {
    fields: questionFields,
    append: questionAppend,
    remove: questionRemove,
  } = useFieldArray({
    control,
    name: "questionnaireFields",
  });

  return (
    <>
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

      {questionFields.length === 0 ? (
        <Heading
          mt={8}
          fontSize={"3xl"}
          fontWeight={"medium"}
          letterSpacing={"tight"}
          color={"font.muted3"}
          textAlign={"center"}
        >
          {questionnaireData.empty.questions.title}
        </Heading>
      ) : (
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
      )}

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
    </>
  );
};

export default QuestionFields;
