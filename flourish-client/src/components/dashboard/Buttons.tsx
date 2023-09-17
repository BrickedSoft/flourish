import { Button, Flex } from "@chakra-ui/react";
import { UseFormReset } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import ButtonFull from "../common/button/ButtonFull";
import { Questionnaire } from "../../types/Questionnaire";
import { RegistrationForm } from "../../types/RegistrationForm";

const Buttons = ({
  isSubmitting,
  isDirty,
  isValid,
  reset,
  data,
}: {
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  reset: UseFormReset<Questionnaire | RegistrationForm | any>;
  data: Questionnaire | RegistrationForm;
}) => {
  const navigate = useNavigate();

  return (
    <Flex gap={16} justifyContent={"space-between"} alignItems={"center"}>
      {/* ------------------------------- Back Button ------------------------------ */}

      <Button
        isLoading={isSubmitting}
        px={"12"}
        py={"1.5rem"}
        fontSize={"lg"}
        leftIcon={<IoArrowBackOutline />}
        colorScheme="linkedin"
        variant="outline"
        borderRadius={"xl"}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Flex gap={16} alignItems={"center"}>
        {/* ------------------------------ Reset Button ------------------------------ */}

        <Button
          isLoading={isSubmitting}
          px={"12"}
          py={"1.5rem"}
          fontSize={"lg"}
          variant={"outline"}
          borderRadius={"xl"}
          colorScheme={"linkedin"}
          isDisabled={!isDirty}
          onClick={() =>
            reset({
              ...data,
            })
          }
        >
          Reset
        </Button>

        {/* ------------------------------- Save Button ------------------------------ */}

        <ButtonFull
          isLoading={isSubmitting}
          px={"16"}
          py={"16"}
          fontSize={"lg"}
          type={"submit"}
          isDisabled={!isDirty || !isValid}
        >
          Save
        </ButtonFull>
      </Flex>
    </Flex>
  );
};

export default Buttons;
