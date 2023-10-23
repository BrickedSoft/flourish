import { useEffect } from "react";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";

import { routes } from "../../../../assets/data/routes";
import RegistrationForm from "../../../../components/form/RegistrationForm";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import { fetchRegistrationForm } from "../../../../store/actions/formActions";

const RegistrationFormDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useAppSelector(
    (state) =>
      _.filter(state.registrationForm.forms, (questionnaire) => {
        return questionnaire.id === id;
      })[0]
  );

  console.log(form);

  useEffect(() => {
    if (!form) navigate(routes[404]);
  }, [form, navigate]);

  useEffect(() => {
    dispatch(fetchRegistrationForm());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RegistrationForm
      isReadOnly
      formData={form}
      showButtonEach={[true, false, false]}
    />
  );
};

export default RegistrationFormDetails;
