import { FC, useState } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Tooltip,
} from "@chakra-ui/react";
import { Control, Controller, FieldErrors } from "react-hook-form";

type FieldType = {
  [key: string]: string;
};

type PropsType = {
  errors: FieldErrors<FieldType>;
  data: {
    title: string;
    placeholder: string;
    fieldName: string;
  };
  options: string[];
  control: Control<FieldType, any>;
  isReadOnly?: boolean;
  value?: string;
};

const RadioField: FC<PropsType> = ({
  errors,
  data: { title, placeholder, fieldName },
  options,
  control,
  isReadOnly = false,
  value = "",
}) => {
  const [isOpen, setIsOpen] = useState("");

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
            <RadioGroup onChange={onChange} defaultValue={value}>
              <Grid
                gridTemplateColumns={`repeat(${options.length}, 1fr)`}
                gap={24}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {options.map((option, index) => (
                  <Tooltip
                    key={index}
                    hasArrow
                    isOpen={isOpen === option}
                    label={option}
                    bg={"bg.tintsTransparent.2"}
                    fontSize={"md"}
                    color={"font.heroLight"}
                    px={8}
                    py={4}
                    borderRadius={"lg"}
                    gutter={24}
                  >
                    <Radio
                      size={"lg"}
                      scale={4}
                      value={option}
                      display={"flex"}
                      justifyContent={"center"}
                      sx={{
                        h: 8,
                        w: 8,
                      }}
                      onMouseLeave={() => setIsOpen("false")}
                      onMouseEnter={() => setIsOpen(option)}
                    >
                      {/* <Text fontSize={"lg"} color={"font.muted"}>
                      {option}
                    </Text> */}
                    </Radio>
                  </Tooltip>
                ))}
              </Grid>
            </RadioGroup>
          )}
        />
      </FormControl>
    </>
  );
};

export default RadioField;
