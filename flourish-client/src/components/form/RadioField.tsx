import { useRef } from "react";
import { FormControl, FormLabel, Grid, useRadioGroup } from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import _ from "lodash";

import { RegistrationFormTypes } from "../../types/RegistrationForm";
import RadioCard from "./RadioCard";

type OptionType = {
  value: string;
  label: string;
};

const RadioField = ({
  control,
  data: { title, placeholder, fieldName },
  options,
  currentValue,
  isReadOnly = false,
}: {
  control: Control<RegistrationFormTypes, any>;
  data: {
    title: string;
    placeholder: string;
    fieldName: keyof RegistrationFormTypes;
  };
  options: OptionType[];
  currentValue?: string;
  isReadOnly?: boolean;
}) => {
  const prevState = useRef<number>(0);
  const values = _.map(options, "value");

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "userType",
    defaultValue: currentValue ?? options[0].value,
    onChange: (value) => {
      prevState.current = _.indexOf(values, value);
    },
  });

  const group = getRootProps();

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
      <FormControl>
        <Controller
          name={fieldName}
          control={control}
          render={({ field: { onChange } }) => (
            <Grid
              templateColumns={"repeat(3,1fr)"}
              gap={36}
              justifyContent={"center"}
              alignItems={"center"}
              {...group}
              onChange={onChange}
              maxW={"4xl"}
            >
              {options.map((value, index) => {
                const radio = getRadioProps({ value: value.value });
                return (
                  <RadioCard
                    key={value.value}
                    {...radio}
                    totalOptions={options.length}
                    index={index}
                    prevState={prevState.current}
                    isReadOnly={isReadOnly}
                  >
                    {value.label}
                  </RadioCard>
                );
              })}
            </Grid>
          )}
        />
      </FormControl>
    </>
  );
};

export default RadioField;
