import { ReactNode } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
} from "@chakra-ui/react";

import { Control, Controller, FieldErrors } from "react-hook-form";
//@ts-ignore
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";

import { RegistrationFormTypes } from "../../types/RegistrationForm";

interface DataType {
  title: string;
  placeholder: string;
  fieldName: keyof RegistrationFormTypes;
}

const DateTimeField = ({
  control,
  errors,
  data: { title, placeholder, fieldName },
  currentValue,
  isReadOnly = false,
}: {
  control: Control<RegistrationFormTypes, any>;
  errors: FieldErrors<RegistrationFormTypes>;
  data: DataType;
  currentValue?: string;
  isReadOnly?: boolean;
}) => {
  const initialValue = currentValue ? new Date(currentValue) : undefined;

  return (
    <>
      <FormLabel
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
        isInvalid={errors[fieldName] ? true : false}
        gridTemplateColumns={"1fr auto"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={16}
        isReadOnly={isReadOnly}
      >
        <Controller
          name={fieldName}
          control={control}
          render={({ field: { onChange } }) => (
            <DatePicker
              format="yyyy-MM-dd HH:mm:ss"
              value={initialValue}
              ranges={[
                {
                  label: "Now",
                  value: new Date(),
                },
              ]}
              style={{
                width: "full",
                maxWidth: "56rem",
                backgroundColor: "white",
                zIndex: 200,
              }}
              onChange={(value: Date | null) => onChange(value?.toISOString())}
              placeholder={placeholder}
              size="lg"
            />
          )}
        />
        <FormErrorMessage fontSize={"md"}>
          {errors[fieldName] && (errors[fieldName]?.message as ReactNode)}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default DateTimeField;
