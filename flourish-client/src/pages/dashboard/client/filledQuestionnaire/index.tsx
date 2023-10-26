import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAppDispatch } from "../../../../hooks/useStore";
import { fetchFilledQuestionnaire } from "../../../../store/actions/questionnaireActions/client";
import { Box } from "@chakra-ui/react";
import { fetchQuestionnaire } from "../../../../store/actions/questionnaireActions/client";

const FilledQuestionnaire = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestionnaire());
    dispatch(fetchFilledQuestionnaire());
  }, [dispatch]);

  return (
    <Box w={"full"} h={"full"} borderRadius={"xl"}>
      <Outlet />
    </Box>
  );
};

export default FilledQuestionnaire;
