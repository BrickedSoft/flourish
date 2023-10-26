import { ReactNode } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { UseFormReset } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LiaUndoAltSolid } from "react-icons/lia";
import { IoSaveOutline } from "react-icons/io5";

import ButtonFull from "../common/button/ButtonFull";
import { QuestionnaireTypes } from "../../types/Questionnaire";
import { RegistrationFormTypes } from "../../types/RegistrationForm";

type FieldType = {
  [key: string]: string;
};

const Buttons = ({
  isSubmitting,
  isDirty,
  isValid,
  reset,
  data,
  titles,
  showButtonEach = [true, true, true],
  children,
}: {
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  reset: UseFormReset<QuestionnaireTypes | RegistrationFormTypes | any>;
  data: QuestionnaireTypes | RegistrationFormTypes | FieldType;
  titles?: string[];
  showButtonEach?: boolean[];
  children?: ReactNode;
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

      {children}

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
            leftIcon={<LiaUndoAltSolid />}
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
            leftIcon={<IoSaveOutline />}
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
