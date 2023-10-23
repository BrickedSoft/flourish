import { useEffect } from "react";
import { VStack } from "@chakra-ui/react";
import _ from "lodash";

import RegistrationFormCard from "../../../../components/form/RegistrationFormCard";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import { fetchRegistrationForm } from "../../../../store/actions/formActions";
import {
  RegistrationFormFields,
  SessionStatus,
} from "../../../../types/RegistrationForm";

const SessionRequest = () => {
  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => {
    const forms = state.registrationForm.forms;

    return _.filter(forms, [
      RegistrationFormFields.SESSION_STATUS,
      SessionStatus.PENDING,
    ]);
  });

  useEffect(() => {
    dispatch(fetchRegistrationForm());
  }, [dispatch]);

  return (
    <VStack w={"full"} h={"full"} spacing={24} alignItems={"stretch"}>
      {forms.map((item, index) => (
        <RegistrationFormCard key={index} data={item} />
      ))}
    </VStack>
  );
};

export default SessionRequest;
