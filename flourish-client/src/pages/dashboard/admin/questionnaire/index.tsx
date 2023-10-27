import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { useAppDispatch } from "../../../../hooks/useStore";
import { fetchQuestionnaire } from "../../../../store/actions/questionnaireActions/admin";

const Questionnaire = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestionnaire());
  }, [dispatch]);

  return (
    <Box w={"full"} borderRadius={"xl"}>
      <Outlet />
    </Box>
  );
};

export default Questionnaire;
