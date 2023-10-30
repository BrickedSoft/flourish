import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { useAppDispatch } from "../../../../hooks/useStore";
import { fetchRegistrationForm } from "../../../../store/actions/registrationFormActions";
import {
  fetchAllQuestionnaire,
  fetchFilledQuestionnaire,
} from "../../../../store/actions/questionnaireActions/admin";

const SessionRequest = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRegistrationForm());
    dispatch(fetchFilledQuestionnaire());
    dispatch(fetchAllQuestionnaire());
  }, [dispatch]);

  return (
    <Box w={"full"} borderRadius={"xl"}>
      <Outlet />
    </Box>
  );
};

export default SessionRequest;
