import { useEffect } from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import { fetchRegistrationForm } from "../../../../store/actions/formActions";
import { RegistrationFormFields } from "../../../../types/RegistrationForm";
import RegistrationForm from "../../../../components/form/RegistrationForm";

const PendingFormDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => {
    const forms = state.registrationForm.forms;

    return _.filter(forms, [RegistrationFormFields.ID, id])[0];
  });

  useEffect(() => {
    dispatch(fetchRegistrationForm());
  }, [dispatch]);

  return <RegistrationForm formData={form} />;
};

export default PendingFormDetails;
