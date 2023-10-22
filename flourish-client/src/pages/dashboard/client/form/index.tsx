import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Questionnaire = () => {
  return (
    <Box w={"full"} px={0} borderRadius={"xl"}>
      <Outlet />
    </Box>
  );
};

export default Questionnaire;
