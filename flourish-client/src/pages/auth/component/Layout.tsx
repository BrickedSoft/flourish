import { ReactNode, useEffect, useState } from "react";
import { Box, Flex, Heading, Text, keyframes } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

import { footerContent, headerContent } from "../../../assets/data/auth";

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

  useEffect(() => {
    setKeyIndex((e) => e + 1);
  }, [pathname]);

  const slideIn = keyframes`
from { opacity: 0; transform: translateX(1rem); }
to { opacity: 1; }
`;
  const animationSlideIn = `${slideIn} .5s ease-in`;

  return (
    <Flex
      flexDir={"column"}
      justifyContent={"space-between"}
      flexGrow={1}
      gap={"16"}
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
    </Flex>
  );
};

export default Layout;
