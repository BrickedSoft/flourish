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
import EvaluationRangeField from "../../../../components/questionnaire/EvaluationRangeField";
import { QuestionnaireTypes } from "../../../../types/Questionnaire";

export const EvaluationFields = ({
  control,
  errors,
  register,
}: {
  control: Control<QuestionnaireTypes>;
  errors: FieldErrors<QuestionnaireTypes>;
  register: UseFormRegister<QuestionnaireTypes>;
}) => {
  const {
    fields: evaluationFields,
    append: evaluationAppend,
    remove: evaluationRemove,
  } = useFieldArray({
    control,
    name: "evaluation_range",
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
          {questionnaireData.evaluationRange}
        </Heading>
        <Divider borderWidth={0.75} />
      </Box>

      {evaluationFields.length === 0 ? (
        <Heading
          mt={8}
          fontSize={"3xl"}
          fontWeight={"medium"}
          letterSpacing={"tight"}
          color={"font.muted3"}
          textAlign={"center"}
        >
          {questionnaireData.empty.evaluationRange.title}
        </Heading>
      ) : (
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
      )}

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
    </>
  );
};
