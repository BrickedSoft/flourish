import { ReactNode } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Select,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IoChevronDownOutline } from "react-icons/io5";

import { RegistrationForm } from "../../../types/RegistrationForm";

const SelectField = ({
  register,
  errors,
  data: { title, placeholder, fieldName },
  options,
  currentValue,
}: {
  register: UseFormRegister<RegistrationForm>;
  errors: FieldErrors<RegistrationForm>;
  data: {
    title: string;
    placeholder: string;
    fieldName: keyof RegistrationForm;
  };
  options: string[];
  currentValue?: string;
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
        <Select
          icon={<IoChevronDownOutline />}
          textTransform={"capitalize"}
          fontSize={"xl"}
          maxW={"4xl"}
          size={"xl"}
          defaultValue={""}
          iconColor="font.muted"
          sx={{
            "&": {
              color: currentValue === "" ? "gray.300" : "current",
              borderWidth: 2,
            },
            "& option[value='']": { color: "gray.300" },
            "& :not(option[value=''])": { color: "font.general" },
          }}
          {...register(fieldName, {
            required: "This is required",
          })}
        >
          <option
            hidden
            disabled
            value=""
            style={{
              color: "font.muted2",
            }}
          >
            {placeholder}
          </option>
          {options.map((value) => {
            value = value.toLowerCase();
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </Select>

        <FormErrorMessage fontSize={"md"}>
          {errors[fieldName] && (errors[fieldName]?.message as ReactNode)}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default SelectField;
