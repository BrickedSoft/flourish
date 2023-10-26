import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const FormHistory = () => {
  return (
    <Box w={"full"} h={"full"} borderRadius={"xl"}>
      <Outlet />
    </Box>
  );
};

export default FormHistory;
