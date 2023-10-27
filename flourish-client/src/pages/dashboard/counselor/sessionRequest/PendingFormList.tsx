import { VStack } from "@chakra-ui/react";
import _ from "lodash";

import RegistrationFormCard from "../../../../components/form/RegistrationFormCard";
import { useAppSelector } from "../../../../hooks/useStore";
import {
  RegistrationFormFields,
  SessionStatus,
} from "../../../../types/RegistrationForm";

const PendingFormList = () => {
  const forms = useAppSelector((state) => {
    const forms = state.registrationForm.forms;
    const filteredForms = _.filter(forms, [
      RegistrationFormFields.SESSION_STATUS,
      SessionStatus.CONFIRMING,
    ]);
    return filteredForms;
  });

  return (
    <VStack w={"full"} py={32} spacing={24} alignItems={"stretch"}>
      {forms.map((item, index) => (
        <RegistrationFormCard key={index} data={item} />
      ))}
    </VStack>
  );
};

export default PendingFormList;
