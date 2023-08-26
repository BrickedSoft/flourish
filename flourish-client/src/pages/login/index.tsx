import { Center, Grid } from "@chakra-ui/react";

import LoginImage from "../../assets/svg/Login";
import Form from "./Form";
import Container from "../../components/common/Container";

const Login = () => {
  return (
    <Container w={"full"} h={"100vh"} overflow={"hidden"} bg={"bgContainer2"}>
      <Center h="full">
        <Grid
          bg={"white"}
          maxW={"12xl"}
          templateColumns={"7fr 5fr"}
          alignItems={"center"}
          gap={"36"}
          py={"32"}
          px={"48"}
          justifyContent={"center"}
          borderRadius={"xl"}
          boxShadow={`0 4.8rem 6.4rem rgba(28, 126, 214, 0.15)`}
        >
          <LoginImage />
          <Form />
        </Grid>
      </Center>
    </Container>
  );
};

export default Login;
