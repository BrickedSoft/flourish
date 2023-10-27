import _ from "lodash";
import { useParams } from "react-router-dom";

import RegistrationForm from "../../../components/form/RegistrationForm";
import { useAppSelector } from "../../../hooks/useStore";
import { RegistrationFormFields } from "../../../types/RegistrationForm";

const PendingFormDetails = () => {
  const { id } = useParams();
  const form = useAppSelector((state) => {
    const forms = state.registrationForm.forms;
    const filteredForms = _.filter(forms, [RegistrationFormFields.ID, id])[0];
    return filteredForms;
  });

  return <RegistrationForm formData={form} isCounselor />;
};

export default PendingFormDetails;
