import { FC } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

type FieldType = {
  [key: string]: string;
};

type PropsType = {
  register: UseFormRegister<FieldType>;
  errors: FieldErrors<FieldType>;
  data: {
    title: string;
    placeholder: string;
    fieldName: string;
  };
  options: string[];
  control: Control<FieldType, any>;
  isReadOnly?: boolean;
};

const RadioField: FC<PropsType> = ({
  register,
  errors,
  data: { title, placeholder, fieldName },
  options,
  control,
  isReadOnly = false,
}) => {
  return (
    <>
      <FormLabel
        htmlFor={fieldName}
        m={0}
        fontSize={"xl"}
        color={"font.muted"}
        fontWeight={"medium"}
        whiteSpace={"nowrap"}
      >
        {title}
      </FormLabel>
      <FormControl
        id={fieldName}
        as={Grid}
        gridTemplateColumns={"1fr auto"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={16}
        isInvalid={errors[fieldName] ? true : false}
        isReadOnly={isReadOnly}
        pointerEvents={isReadOnly ? "none" : "auto"}
      >
        <Controller
          name={fieldName}
          control={control}
          render={({ field: { onChange } }) => (
            <RadioGroup onChange={onChange}>
              <Stack direction="row" spacing={24}>
                {options.map((option, index) => (
                  <Radio size={"lg"} key={index} value={option}>
                    <Text fontSize={"lg"} color={"font.muted"}>{option}</Text>
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          )}
        />
      </FormControl>
    </>
  );
};

export default RadioField;
