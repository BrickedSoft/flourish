import { Grid } from "@chakra-ui/react";

import LoginImage from "../../assets/svg/Login";
import Form from "./Form";
import Container from "../../components/common/Container";

const Login = () => {
  return (
    <Container w={"full"} maxW={"12xl"} h={"100vh"} overflow={"hidden"}>
      <Grid
        h={"full"}
        templateColumns={"7fr 5fr"}
        alignItems={"center"}
        gap={"36"}
        justifyContent={"center"}
      >
        <LoginImage />
        <Form />
      </Grid>
    </Container>
  );
};

export default Login;
