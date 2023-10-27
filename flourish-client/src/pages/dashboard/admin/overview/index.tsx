import { useEffect } from "react";
import { Box, VStack } from "@chakra-ui/react";
import _ from "lodash";

import RegistrationFormCard from "../../../../components/form/RegistrationFormCard";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import { fetchRegistrationForm } from "../../../../store/actions/registrationFormActions";
import {
  RegistrationFormFields,
  SessionStatus,
} from "../../../../types/RegistrationForm";

// type FilteredFormsType = {
//   [SessionStatus.PENDING]: RegistrationFormTypes[];
//   [SessionStatus.ONGOING]: RegistrationFormTypes[];
//   [SessionStatus.COMPLETED]: RegistrationFormTypes[];
//   [SessionStatus.REJECTED]: RegistrationFormTypes[];
// };

// const initialFilteredForms: FilteredFormsType = {
//   [SessionStatus.PENDING]: [],
//   [SessionStatus.ONGOING]: [],
//   [SessionStatus.COMPLETED]: [],
//   [SessionStatus.REJECTED]: [],
// };

const OverView = () => {
  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => {
    const forms = state.registrationForm.forms;
    const filteredForms = _.filter(
      forms,
      (item) =>
        item[RegistrationFormFields.SESSION_STATUS] !== SessionStatus.PENDING
    );
    return filteredForms;
  });
  // const [filteredForms, setFilteredForm] =
  //   useState<FilteredFormsType>(initialFilteredForms);

  useEffect(() => {
    dispatch(fetchRegistrationForm());
  }, [dispatch]);

  // useEffect(() => {
  //   const pendingForms = _.filter(forms, [
  //     RegistrationFormFields.SESSION_STATUS,
  //     SessionStatus.PENDING,
  //   ]);

  //   const ongoingForms = _.filter(forms, [
  //     RegistrationFormFields.SESSION_STATUS,
  //     SessionStatus.ONGOING,
  //   ]);

  //   const completedForms = _.filter(forms, [
  //     RegistrationFormFields.SESSION_STATUS,
  //     SessionStatus.COMPLETED,
  //   ]);

  //   const rejectedForms = _.filter(forms, [
  //     RegistrationFormFields.SESSION_STATUS,
  //     SessionStatus.REJECTED,
  //   ]);

  //   setFilteredForm({
  //     [SessionStatus.PENDING]: pendingForms,
  //     [SessionStatus.ONGOING]: ongoingForms,
  //     [SessionStatus.COMPLETED]: completedForms,
  //     [SessionStatus.REJECTED]: rejectedForms,
  //   });
  // }, [forms]);

  return (
    <VStack w={"full"} py={32} spacing={24} alignItems={"stretch"}>
      {forms.map((item, index) => (
        <RegistrationFormCard key={index} data={item} />
      ))}
      <Box pt={32}></Box>
    </VStack>
  );
};

export default OverView;
