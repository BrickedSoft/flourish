import { VStack } from "@chakra-ui/react";
import _ from "lodash";

import RegistrationFormCard from "../../../../components/form/RegistrationFormCard";
import { useAppSelector } from "../../../../hooks/useStore";
import {
  RegistrationFormFields,
  SessionStatus,
} from "../../../../types/RegistrationForm";
import { routes } from "../../../../assets/data/routes";

const OverviewFormList = () => {
  const fromList = useAppSelector((state) => {
    const forms = state.registrationForm.forms;
    const filteredForms = _.filter(
      forms,
      (item) =>
        item[RegistrationFormFields.SESSION_STATUS] === SessionStatus.ONGOING
    );
    return filteredForms;
  });

  return (
    <VStack w={"full"} h={"full"} py={32} spacing={24} alignItems={"stretch"}>
      {fromList.map((data, index) => (
        <RegistrationFormCard key={index} data={data} route={routes.overview} />
      ))}
    </VStack>
  );
};

export default OverviewFormList;
