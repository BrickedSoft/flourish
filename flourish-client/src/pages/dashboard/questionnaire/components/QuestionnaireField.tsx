import {
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
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

import { questionnaireData } from "../../../../assets/data/dashboard/questionnaire/questionnaire";
import ButtonFull from "../../../../components/common/button/ButtonFull";
import { Questionnaire } from "../../../../types/Questionnaire";

const QuestionnaireField = ({
  data,
  index,
  errors,
  register,
  remove,
}: {
  data: FieldArrayWithId<Questionnaire, "questionnaireFields", "id">;
  errors: FieldErrors<Questionnaire>;
  index: number;
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
    <Flex alignItems={"baseline"} gap={"8"}>
      <FormLabel
        htmlFor="questionnaire"
        fontSize={"xl"}
        color={"font.muted2"}
        fontWeight={"normal"}
        whiteSpace={"nowrap"}
      >
        {questionnaireData.questionnaireField.title} &ndash; {index + 1}
        <Text as={"span"} fontSize={"2xl"} fontWeight={"medium"}>
          :
        </Text>
      </FormLabel>
      <Editable
        key={data.id}
        id="questionnaire"
        minW={"75%"}
        fontSize={"xl"}
        borderWidth={"2"}
        borderColor={"transparent"}
        borderRadius={"xl"}
        defaultValue={
          data.question || questionnaireData.questionnaireField.placeholder
        }
      >
        <EditablePreview px={12} py={4} borderColor={"transparent"} />
        <EditableInput
          type="text"
          px={12}
          py={4}
          key={data.id}
          {...register(`questionnaireFields.${index}.question`, {
            required: "This is required",
          })}
        />
      </Editable>
      <FormErrorMessage fontSize={"md"} display={"block"}>
        {errors?.questionnaireFields?.[index] &&
          (errors?.questionnaireFields?.[index]?.question
            ?.message as React.ReactNode)}
      </FormErrorMessage>
    </Flex>

    <ButtonFull
      px={"8"}
      py={"16"}
      fontSize={"lg"}
      justifySelf={"flex-end"}
      onClick={() => remove(index)}
      bg={"transparent"}
      _hover={{ bg: "transparent", transform: "scale(1.1)" }}
    >
      <Flex gap={4} alignItems={"center"}>
        <Text as={"span"} fontSize={24} color={"error"}>
          {questionnaireData.button.questionnaire.remove.icon}
        </Text>
        {questionnaireData.button.questionnaire.remove.title}
      </Flex>
    </ButtonFull>
  </FormControl>
);

export default QuestionnaireField;
