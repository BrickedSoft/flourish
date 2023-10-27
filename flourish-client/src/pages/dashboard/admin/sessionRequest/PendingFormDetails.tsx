import { VStack } from "@chakra-ui/react";
import _ from "lodash";
import { useParams } from "react-router-dom";

import RegistrationForm from "../../../../components/form/RegistrationForm";
import { useAppSelector } from "../../../../hooks/useStore";
import { RegistrationFormFields } from "../../../../types/RegistrationForm";
import FilledQuestionnaireList from "./FilledQuestionnaireList";

const PendingFormDetails = () => {
  const { id } = useParams();
  const form = useAppSelector((state) => {
    const forms = state.registrationForm.forms;
    const filteredForms = _.filter(forms, [RegistrationFormFields.ID, id])[0];
    return filteredForms;
  });

  return (
    <VStack w={"full"} spacing={64} justifyContent={"stretch"} pb={32}>
      <RegistrationForm formData={form} isAdmin />

      <FilledQuestionnaireList clientId={form?.client} />
    </VStack>
  );
};

export default PendingFormDetails;
