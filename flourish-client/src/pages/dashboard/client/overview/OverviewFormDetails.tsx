import { useEffect } from "react";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";

import { routes } from "../../../../assets/data/routes";
import RegistrationForm from "../../../../components/form/RegistrationForm";
import { useAppSelector } from "../../../../hooks/useStore";

const OverviewFormDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const form = useAppSelector((state) => {
    const forms = state.registrationForm.forms;
    const filteredForms = _.filter(forms, (questionnaire) => {
      return questionnaire.id === id;
    })[0];
    return filteredForms;
  });

  useEffect(() => {
    if (!form) navigate(routes[404]);
  }, [form, navigate]);

  return (
    <RegistrationForm
      isReadOnly
      formData={form}
      showButtonEach={[true, false, false]}
    />
  );
};

export default OverviewFormDetails;
