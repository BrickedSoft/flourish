import {
  Center,
  Grid,
  Heading,
  Image,
  Text,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { routes } from "../../assets/data/routes";
import ghostImage from "../../assets/img/ghost.png";
import { useEffect, useState } from "react";

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
      stiffness: 12,
      // when: "beforeChildren",
      // staggerChildren: 0.5,
    },
  },
};

const imageVariants = {
  imageInitial: {
    y: -15,
  },
  visible: {
    y: 15,
    transition: {
      type: "spring",
      mass: 0.6,
      damping: 5,
      stiffness: 10,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const NotFound = () => {
  const [firstAnimation, setFirstAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFirstAnimation(false);
    }, 3000);
  }, []);

  return (
    <Center
      w={"100vw"}
      h={"100vh"}
      bg="#1C39BB"
      fontFamily={"secondary"}
      fontWeight={"medium"}
      color={"white"}
      fontSize={"xl"}
    >
      <Grid
        templateColumns={"auto auto"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={128}
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
            py={12}
            px={24}
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
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          gap={-4}
          //@ts-ignore
          variants={firstAnimation && containerVariants}
          initial={"imageInitial"}
          animate={"visible"}
        >
          <ChakraBox
            //@ts-ignore
            variants={firstAnimation || imageVariants}
            initial={"imageInitial"}
            animate={"visible"}
          >
            <Image src={ghostImage} alt="ghost" w={400} h={400} />
          </ChakraBox>
          <ChakraBox
            w="60%"
            h={32}
            borderRadius={"50%"}
            bg={"hsla(38, 21%, 19%, .16)"}
            filter={"blur(7px)"}
            initial={{ scale: 0.85 }}
            //@ts-ignore
            animate={
              firstAnimation || {
                scale: [0.85, 1],
                transition: {
                  ...imageVariants.visible.transition,
                },
              }
            }
          ></ChakraBox>
        </ChakraBox>
      </Grid>
    </Center>
  );
};

export default NotFound;
