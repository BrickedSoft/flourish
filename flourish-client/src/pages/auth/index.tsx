import { Box, Center, Flex, Grid, Image } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

import logo from "../../assets/img/logo.png";
import SignInImage from "../../assets/svg/Auth";
import Container from "../../components/common/Container";
import { useAppSelector } from "../../hooks/useStore";
import { motion } from "framer-motion";

const fadeVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const Auth = () => {
  const token = useAppSelector((state) => state.user.token);

  return (
    <Container
      w={"full"}
      minH={"100vh"}
      h={"full"}
      overflow={"hidden"}
      bg={"bg.container2"}
      display={"flex"}
      flexDir={"column"}
    >
      <style>
        {`
        ::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>
      <Center h="full" my={"auto"} py={"36"}>
        <Grid
          bg={"white"}
          maxW={"12xl"}
          h={"full"}
          templateColumns={"7fr 5fr"}
          gap={"36"}
          pt={"48"}
          pb={"36"}
          px={"48"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"xl"}
          boxShadow={`0 4.8rem 6.4rem rgba(28, 126, 214, 0.15)`}
        >
          <Center as={motion.div} variants={fadeVariants} exit={"exit"}>
            <SignInImage />
          </Center>

          <Flex
            alignSelf={"stretch"}
            maxW={"2xl"}
            h={"full"}
            px={"32"}
            flexDir={"column"}
            gap={"24"}
            alignItems={"space-between"}
            justifyContent={"space-between"}
            overflow={"hidden"}
          >
            <Box
              as={motion.div}
              alignSelf={"end"}
              flexGrow={0}
              _focus={{
                boxShadow: "none",
              }}
              mb={"16"}
              variants={fadeVariants}
              initial={"hidden"}
              animate={"visible"}
              exit={"exit"}
            >
              <Link
                to={"/"}
                style={{
                  pointerEvents: `${token ? "none" : "auto"}`,
                }}
              >
                <Image src={logo} h={"14"} w={"auto"} alt={"logo"} />
              </Link>
            </Box>

            <Outlet />
          </Flex>
        </Grid>
      </Center>
    </Container>
  );
};

export default Auth;
