import { Center, Grid } from "@chakra-ui/react";

import SignupImage from "../../assets/svg/Signup";
import Form from "./Form";
import Container from "../../components/common/Container";

const Signup = () => {
  return (
    <Container w={"full"} h={"100vh"} overflow={"hidden"} bg={"bg.container2"}>
      <Center h="full" py={"24"}>
        <Grid
          bg={"white"}
          maxW={"12xl"}
          h={"full"}
          templateColumns={"7fr 5fr"}
          gap={"36"}
          py={"32"}
          px={"48"}
          justifyContent={"center"}
          borderRadius={"xl"}
          boxShadow={`0 4.8rem 6.4rem rgba(28, 126, 214, 0.15)`}
        >
          <SignupImage />
          <Form />
        </Grid>
      </Center>
    </Container>
  );
};

export default Signup;
