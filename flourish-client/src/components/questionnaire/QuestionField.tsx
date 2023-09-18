import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

import { questionnaireData } from "../../assets/data/dashboard/questionnaire";
import { Questionnaire } from "../../types/Questionnaire";

const QuestionField = ({
  data,
  index,
  control,
  errors,
  register,
  remove,
}: {
  data: FieldArrayWithId<Questionnaire, "questionnaireFields", "id">;
  errors: FieldErrors<Questionnaire>;
  index: number;
  control: Control<Questionnaire>;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<Questionnaire>;
}) => (
  <FormControl
    w={"full"}
    isInvalid={errors.questionnaireFields?.[index]?.question ? true : false}
    display={"grid"}
    gridTemplateColumns={"1fr auto"}
    alignItems={"center"}
    justifyContent={"space-between"}
    gap={"24"}
  >
    <Flex alignItems={"center"} gap={16}>
      <FormLabel
        htmlFor="questionnaire"
        m={0}
        fontSize={"xl"}
        color={"font.muted2"}
        fontWeight={"normal"}
        whiteSpace={"nowrap"}
      >
        {questionnaireData.questionField.title} &ndash; {index + 1}
        <Text as={"span"} fontSize={"2xl"} fontWeight={"medium"}>
          :
        </Text>
      </FormLabel>

      <Controller
        name={`questionnaireFields.${index}.question`}
        control={control}
        render={({ field }) => (
          <Editable
            key={data.id}
            id="questionnaire"
            minW={"75%"}
            fontSize={"xl"}
            value={field.value}
            placeholder={questionnaireData.questionField.placeholder}
          >
            <>
              <EditablePreview
                h={"3.2rem"}
                display={"flex"}
                alignItems={"center"}
                px={12}
              />
              <EditableInput
                key={data.id}
                type="text"
                h={"3.2rem"}
                px={12}
                borderRadius={"xl"}
                {...field}
                {...register(`questionnaireFields.${index}.question`, {
                  required: "This is required",
                })}
              />
            </>
          </Editable>
        )}
      />

      <FormErrorMessage fontSize={"md"} display={"block"}>
        {errors?.questionnaireFields?.[index] &&
          (errors?.questionnaireFields?.[index]?.question
            ?.message as React.ReactNode)}
      </FormErrorMessage>
    </Flex>

    <Button
      fontSize={"lg"}
      justifySelf={"flex-end"}
      onClick={() => remove(index)}
      variant={"ghost"}
      _hover={{ transform: "scale(1.1)" }}
    >
      <Flex gap={4} alignItems={"center"}>
        <Text as={"span"} fontSize={24} color={"error"}>
          {questionnaireData.button.question.remove.icon}
        </Text>
        {questionnaireData.button.question.remove.title}
      </Flex>
    </Button>
  </FormControl>
);

export default QuestionField;
