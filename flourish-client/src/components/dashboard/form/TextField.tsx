import { ReactNode } from "react";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { RegistrationForm } from "../../../types/RegistrationForm";

interface data {
  title: string;
  secondaryTitle?: string;
  placeholder: string;
  fieldName: keyof RegistrationForm;
}

const TextField = ({
  errors,
  register,
  data: { title, secondaryTitle, placeholder, fieldName },
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
        alignSelf={"start"}
        as={Flex}
        gap={4}
      >
        <Text>{title}</Text>
        {secondaryTitle && (
          <Text fontSize={"lg"} color={"font.muted2"}>
            {secondaryTitle}
          </Text>
        )}
      </FormLabel>
      <FormControl
        as={Grid}
        isInvalid={errors[fieldName] ? true : false}
        gridTemplateColumns={"1fr auto"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={16}
      >
        <Textarea
          id={fieldName}
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
          h={"3xs"}
          _placeholder={{
            color: "gray.300",
          }}
        />

        <FormErrorMessage fontSize={"md"}>
          {errors[fieldName] && (errors[fieldName]?.message as ReactNode)}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default TextField;
