import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";

import { questionnaireData } from "../../assets/data/dashboard/questionnaire";
import { Questionnaire } from "../../types/Questionnaire";

const OptionField = ({
  data,
  index,
  control,
  errors,
  register,
  remove,
}: {
  data: FieldArrayWithId<Questionnaire, "options", "id">;
  errors: FieldErrors<Questionnaire>;
  index: number;
  control: Control<Questionnaire>;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<Questionnaire>;
}) => (
  <FormControl
    w={"full"}
    isInvalid={errors.options?.[index]?.name ? true : false}
    display={"grid"}
    gridTemplateColumns={"1fr 1fr auto"}
    alignItems={"center"}
    justifyContent={"space-between"}
    gap={32}
  >
    <Flex alignItems={"center"} gap={16}>
      <FormLabel
        htmlFor={`option-${data.id}`}
        m={0}
        fontSize={"xl"}
        color={"font.muted2"}
        fontWeight={"normal"}
        whiteSpace={"nowrap"}
      >
        {questionnaireData.optionField.option.title} &ndash; {index + 1}
        <Text as={"span"} fontSize={"2xl"} fontWeight={"medium"}>
          :
        </Text>
      </FormLabel>

      <Controller
        name={`options.${index}.name`}
        control={control}
        render={({ field }) => (
          <Editable
            key={data.id}
            id={`option-${data.id}`}
            minW={"75%"}
            fontSize={"xl"}
            value={field.value}
            placeholder={questionnaireData.optionField.option.placeholder}
          >
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
              {...register(`options.${index}.name`, {
                required: "This is required",
              })}
            />
          </Editable>
        )}
      />

      <FormErrorMessage fontSize={"md"} display={"block"}>
        {errors?.options?.[index] &&
          (errors?.options?.[index]?.name?.message as React.ReactNode)}
      </FormErrorMessage>
    </Flex>

    <Flex alignItems={"center"} gap={16}>
      <FormLabel
        htmlFor={`points-${data.id}`}
        m={0}
        fontSize={"xl"}
        color={"font.muted2"}
        fontWeight={"normal"}
        whiteSpace={"nowrap"}
      >
        {questionnaireData.optionField.points.title}
        <Text as={"span"} fontSize={"2xl"} fontWeight={"medium"}>
          :
        </Text>
      </FormLabel>

      <Controller
        name={`options.${index}.points`}
        control={control}
        render={({ field }) => (
          <Editable
            as={NumberInput}
            key={data.id}
            id={`points-${data.id}`}
            minW={"75%"}
            fontSize={"xl"}
            value={field.value}
            clampValueOnBlur={false}
            min={0}
            defaultValue={"0"}
            placeholder={questionnaireData.optionField.points.placeholder}
          >
            <EditablePreview
              h={"3.2rem"}
              display={"flex"}
              alignItems={"center"}
              px={12}
            />
            <EditableInput
              as={NumberInputField}
              key={data.id}
              h={"3.2rem"}
              px={12}
              borderRadius={"xl"}
              {...field}
              {...register(`options.${index}.points`, {
                required: "This is required",
              })}
            />
            <NumberInputStepper mx={4}>
              <NumberIncrementStepper
                border={"none"}
                fontSize={"lg"}
                color={"font.muted"}
                borderRadius={"md"}
                _active={{ bg: "primary.50" }}
                onClick={() => field.onChange(Number(field.value) + 1)}
              >
                <IoChevronUpOutline />
              </NumberIncrementStepper>
              <NumberDecrementStepper
                border={"none"}
                fontSize={"lg"}
                color={"font.muted"}
                borderRadius={"md"}
                _active={{ bg: "primary.50" }}
                onClick={() =>
                  Number(field.value) > 0 &&
                  field.onChange(Number(field.value) - 1)
                }
              >
                <IoChevronDownOutline />
              </NumberDecrementStepper>
            </NumberInputStepper>
          </Editable>
        )}
      />

      <FormErrorMessage fontSize={"md"} display={"block"}>
        {errors?.options?.[index] &&
          (errors?.options?.[index]?.name?.message as React.ReactNode)}
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
          {questionnaireData.button.option.remove.icon}
        </Text>
        {questionnaireData.button.option.remove.title}
      </Flex>
    </Button>
  </FormControl>
);

export default OptionField;
