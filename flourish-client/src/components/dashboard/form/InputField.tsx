import { ReactNode } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { RegistrationForm } from "../../../types/RegistrationForm";

interface data {
  title: string;
  placeholder: string;
  fieldName: keyof RegistrationForm;
}

const InputField = ({
  errors,
  register,
  data: { title, placeholder, fieldName },
}: {
  errors: FieldErrors<RegistrationForm>;
  register: UseFormRegister<RegistrationForm>;
  data: data;
}) => {
  return (
    <>
      <FormLabel
        htmlFor={fieldName}
        m={0}
        fontSize={"xl"}
        color={"font.muted"}
        fontWeight={"normal"}
        whiteSpace={"nowrap"}
      >
        {title}
      </FormLabel>
      <FormControl
        id={fieldName}
        as={Grid}
        isInvalid={errors[fieldName] ? true : false}
        gridTemplateColumns={"1fr auto"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={16}
      >
        <Input
          type={"text"}
          placeholder={placeholder}
          {...register(fieldName, {
            required: "This is required",
          })}
          px={"16"}
          py={"18"}
          fontSize={"xl"}
          borderWidth={"2"}
          borderRadius={"xl"}
          maxW={"4xl"}
          _placeholder={{ color: "gray.300" }}
        />

        <FormErrorMessage fontSize={"md"}>
          {errors[fieldName] && (errors[fieldName]?.message as ReactNode)}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default InputField;
