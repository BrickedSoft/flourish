import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  List,
  Text,
} from "@chakra-ui/react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";

import { questionnaireData } from "../../../assets/data/questionnaire";
import OptionField from "../../../components/questionnaire/OptionField";
import { Questionnaire } from "../../../types/Questionnaire";

const OptionFields = ({
  control,
  errors,
  register,
}: {
  control: Control<Questionnaire>;
  errors: FieldErrors<Questionnaire>;
  register: UseFormRegister<Questionnaire>;
}) => {
  const {
    fields: optionFields,
    append: optionAppend,
    remove: optionRemove,
  } = useFieldArray({
    control,
    name: "options",
  });

  return (
    <>
      <Box>
        <Heading
          mb={4}
          fontWeight={"semibold"}
          color={"font.primary"}
          letterSpacing={"tight"}
        >
          {questionnaireData.options}
        </Heading>
        <Divider borderWidth={0.75} />
      </Box>

      {optionFields.length === 0 ? (
        <Heading
          mt={8}
          fontSize={"3xl"}
          fontWeight={"medium"}
          letterSpacing={"tight"}
          color={"font.muted3"}
          textAlign={"center"}
        >
          {questionnaireData.empty.options.title}
        </Heading>
      ) : (
        <List display={"flex"} flexDir={"column"} gap={16}>
          {optionFields.map((field, index) => (
            <OptionField
              key={field.id}
              control={control}
              errors={errors}
              index={index}
              register={register}
              remove={optionRemove}
              data={field}
            />
          ))}
        </List>
      )}

      <Button
        px={"16"}
        py={"20"}
        fontSize={"lg"}
        alignSelf={"center"}
        colorScheme={"green"}
        borderRadius={"xl"}
        onClick={() => {
          optionAppend({
            name: "",
            points: 0,
          });
        }}
      >
        <Flex gap={8} alignItems={"center"}>
          <Text as={"span"} fontSize={20}>
            {questionnaireData.button.option.add.icon}
          </Text>
          {questionnaireData.button.option.add.title}
        </Flex>
      </Button>
    </>
  );
};

export default OptionFields;
