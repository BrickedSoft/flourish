import React from "react";
import Container from "../../components/common/Container";
import {
  Box,
  Grid,
  VStack,
  Text,
  Heading,
  Center,
  GridItem,
  Image,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import ButtonFull from "../../components/common/button/ButtonFull";
import ghostImage from "../../assets/img/ghost.png";
import { Link, Route } from "react-router-dom";
import { routes } from "../../assets/data/routes";
import { isValidMotionProp, motion } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const ChakraButton = chakra(motion.button, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const containerVariants = {
  contentInitial: { y: -100, opacity: 0 },
  imageInitial: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      type: "spring",
      mass: 0.5,
      damping: 10,
      stiffness: 15,
      // when: "beforeChildren",
      // staggerChildren: 0.5,
    },
  },
};

const NotFound = () => {
  return (
    <Center
      w={"100vw"}
      h={"100vh"}
      bg="#DFAA4E"
      fontFamily={"secondary"}
      fontWeight={"medium"}
      color={"font.focused"}
      fontSize={"xl"}
    >
      <Grid
        templateColumns={"auto auto"}
        justifyContent={"space-around"}
        alignItems={"center"}
        gap={64}
      >
        <ChakraBox
          as={motion.div}
          display={"flex"}
          flexDir={"column"}
          alignItems={"start"}
          gap={16}
          variants={containerVariants}
          initial={"contentInitial"}
          animate={"visible"}
        >
          <Text>Error 404</Text>
          <Heading fontSize={"8rem"} fontFamily={"secondary"}>
            OOPS!
          </Heading>
          <Text maxW={"25ch"}>
            We can't seem to find the page you are looking for.
          </Text>
          <ChakraButton
            mt={8}
            borderRadius={"full"}
            bg="black"
            fontSize={"xl"}
            color={"white"}
            p={16}
            whileHover={{
              scale: 1.05,
              textShadow: "0px 0px 12px rgb(255,255,255)",
              boxShadow: "0px 0px 12px 1px rgba(0,0,0,0.75)",
            }}
            transition={{
              type: "spring",
            }}
          >
            <Link to={routes.home}>Go Home</Link>
          </ChakraButton>
        </ChakraBox>

        <ChakraBox
          variants={containerVariants}
          initial={"imageInitial"}
          animate={"visible"}
        >
          <Image src={ghostImage} alt="ghost" w={400} h={400} />
        </ChakraBox>
      </Grid>
    </Center>
  );
};

export default NotFound;
