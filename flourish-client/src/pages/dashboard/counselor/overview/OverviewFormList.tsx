import { Box, VStack } from "@chakra-ui/react";
import _ from "lodash";

import RegistrationFormCard from "../../../../components/form/RegistrationFormCard";
import { useAppSelector } from "../../../../hooks/useStore";
import {
  RegistrationFormFields,
  SessionStatus,
} from "../../../../types/RegistrationForm";
import { routes } from "../../../../assets/data/routes";

const OverviewFormList = () => {
  const forms = useAppSelector((state) => {
    const forms = state.registrationForm.forms;
    const filteredForms = _.filter(
      forms,
      (item) =>
        item[RegistrationFormFields.SESSION_STATUS] !==
          SessionStatus.CONFIRMING &&
        item[RegistrationFormFields.SESSION_STATUS] !== SessionStatus.PENDING &&
        item[RegistrationFormFields.SESSION_STATUS] !== SessionStatus.REJECTED
    );
    return filteredForms;
  });

  return (
    <VStack w={"full"} py={32} spacing={24} alignItems={"stretch"}>
      {forms.map((item, index) => (
        <RegistrationFormCard key={index} data={item} route={routes.overview} />
      ))}
      <Box pt={32}></Box>
    </VStack>
  );
};

export default OverviewFormList;
