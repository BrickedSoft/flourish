import React from "react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Text,
} from "@chakra-ui/react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { questionnaireData } from "../../../assets/data/questionnaire";
import { Questionnaire } from "../../../types/Questionnaire";

export const QuestionnaireName = ({
  control,
  errors,
  register,
}: {
  control: Control<Questionnaire>;
  errors: FieldErrors<Questionnaire>;
  register: UseFormRegister<Questionnaire>;
}) => {
  return (
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
  );
};
