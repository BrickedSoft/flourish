import { Box } from "@chakra-ui/react";

const Container = (props: any) => {
  return (
    <Box w={"full"} maxW={"full"} px={"32"} mx={"auto"} {...props}>
      {props.children}
    </Box>
  );
};

export default Container;
