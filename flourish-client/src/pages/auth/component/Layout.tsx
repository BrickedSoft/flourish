import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  chakra,
  keyframes,
  shouldForwardProp,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { isValidMotionProp, motion } from "framer-motion";

import { footerContent, headerContent } from "../../../assets/data/auth";
import { useAppSelector } from "../../../hooks/useStore";

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
  const [keyIndex, setKeyIndex] = useState(1);
  const { pathname } = useLocation();

  const token = useAppSelector((state) => state.user.token);

  useEffect(() => {
    setKeyIndex((e) => e + 1);
  }, [pathname]);

  const slideIn = keyframes`
from { opacity: 0; transform: translateX(1rem); }
to { opacity: 1; }
`;
  const animationSlideIn = `${slideIn} .5s ease-in`;

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
      transition={"transition"}
    >
      <Flex
        key={keyIndex}
        flexDir={"column"}
        gap={"8"}
        animation={animationSlideIn}
      >
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

      <Box key={keyIndex + 1} animation={animationSlideIn}>
        {children}
      </Box>

      <Flex
        gap={"12"}
        alignItems={"baseline"}
        justifyContent={"center"}
        justifySelf={"flex-end"}
        opacity={token ? 0 : 1}
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
