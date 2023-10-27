import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { useAppDispatch } from "../../../../hooks/useStore";
import { fetchRegistrationForm } from "../../../../store/actions/registrationFormActions";

const FormHistory = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRegistrationForm());
  }, [dispatch]);
  return (
    <Box w={"full"} h={"full"} borderRadius={"xl"}>
      <Outlet />
    </Box>
  );
};

export default FormHistory;
