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
  titles,
  showButtonEach = [true, true, true],
}: {
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  reset: UseFormReset<Questionnaire | RegistrationForm | any>;
  data: Questionnaire | RegistrationForm;
  titles?: string[];
  showButtonEach?: boolean[];
}) => {
  const navigate = useNavigate();

  return (
    <Flex gap={16} justifyContent={"space-between"} alignItems={"center"}>
      {/* ------------------------------- Back Button ------------------------------ */}

      {showButtonEach[0] && (
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
          {titles?.at(0) || "Back"}
        </Button>
      )}

      <Flex gap={16} alignItems={"center"}>
        {/* ------------------------------ Reset Button ------------------------------ */}

        {showButtonEach[1] && (
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
            {titles?.at(1) || "Reset"}
          </Button>
        )}

        {/* ------------------------------- Save Button ------------------------------ */}

        {showButtonEach[2] && (
          <ButtonFull
            isLoading={isSubmitting}
            px={"16"}
            py={"16"}
            fontSize={"lg"}
            type={"submit"}
            isDisabled={!isDirty || !isValid}
          >
            {titles?.at(2) || "Save"}
          </ButtonFull>
        )}
      </Flex>
    </Flex>
  );
};

export default Buttons;
