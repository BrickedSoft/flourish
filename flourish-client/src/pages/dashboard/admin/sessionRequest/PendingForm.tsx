import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const PendingForm = () => {
  return (
    <Box w={"full"} borderRadius={"xl"}>
      <Outlet />
    </Box>
  );
};

export default PendingForm;
