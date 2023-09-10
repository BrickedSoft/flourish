import { ReactNode } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import { footerContent, headerContent } from "../../../assets/data/auth";
import { useAppSelector } from "../../../hooks/useStore";
import { Status } from "../../../types/Status";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (props) =>
    isValidMotionProp(props) || shouldForwardProp(props),
});

const formVariants = {
  hidden: {
    x: "100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.25,
      duration: 0.5,
      type: "tween",
    },
  },
  exit: {
    x: "100vw",
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      type: "tween",
    },
  },
};

const Layout = ({
  header,
  footer,
  children,
}: {
  header: typeof headerContent.signIn;
  footer: typeof footerContent.signIn;
  children: ReactNode;
}) => {
  useLocation();
  const status = useAppSelector(
    (state) => state.user.status === Status.FULFILLED
  );

  return (
    <ChakraBox
      display={"flex"}
      flexDir={"column"}
      justifyContent={"space-between"}
      flexGrow={1}
      gap={"16"}
      variants={formVariants}
      initial={"hidden"}
      animate={"visible"}
      exit={"exit"}
    >
      <Flex flexDir={"column"} gap={"8"}>
        <Heading
          color="font.secondary"
          fontSize="6xl"
          textAlign={"center"}
          lineHeight="shorter"
          letterSpacing="tighter"
          fontWeight="medium"
        >
          {header?.title}
        </Heading>
        <Text fontSize={"lg"} textAlign={"center"} color={"font.muted2"}>
          {header?.description}
        </Text>
      </Flex>

      {children}

      <Flex
        gap={"12"}
        alignItems={"baseline"}
        justifyContent={"center"}
        justifySelf={"flex-end"}
        opacity={status ? 0 : 1}
      >
        <Text fontSize={"lg"} color={"font.muted2"}>
          {footer.description}
        </Text>
        <Box
          fontSize={"xl"}
          fontWeight={"medium"}
          color={"font.primary"}
          onClick={(e) => e.preventDefault()}
        >
          <Link to={footer.href}>{footer.title}</Link>
        </Box>
      </Flex>
    </ChakraBox>
  );
};

export default Layout;
