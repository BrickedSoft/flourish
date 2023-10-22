import { useRef } from "react";
import { FormControl, FormLabel, Grid, useRadioGroup } from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import _ from "lodash";

import { RegistrationForm } from "../../types/RegistrationForm";
import RadioCard from "./RadioCard";

const RadioField = ({
  control,
  data: { title, placeholder, fieldName },
  options,
  isReadOnly = false,
}: {
  control: Control<RegistrationForm, any>;
  data: {
    title: string;
    placeholder: string;
    fieldName: keyof RegistrationForm;
  };
  options: string[];
  isReadOnly?: boolean;
}) => {
  const prevState = useRef<number>(0);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "userType",
    defaultValue: options[0],
    onChange: (value) => {
      prevState.current = _.indexOf(options, value);
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
                const radio = getRadioProps({ value });
                return (
                  <RadioCard
                    key={value}
                    {...radio}
                    totalOptions={options.length}
                    index={index}
                    prevState={prevState.current}
                    isReadOnly={isReadOnly}
                  >
                    {value}
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
