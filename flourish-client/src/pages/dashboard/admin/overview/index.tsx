import { useEffect } from "react";

import { useAppDispatch } from "../../../../hooks/useStore";
import { fetchRegistrationForm } from "../../../../store/actions/formActions";

const OverView = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRegistrationForm());
  }, [dispatch]);

  return <div>OverView</div>;
};

export default OverView;
