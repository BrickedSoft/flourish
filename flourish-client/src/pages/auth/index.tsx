import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  keyframes,
} from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { buttonData, headerContent } from "../../assets/data/auth";
import logo from "../../assets/img/logo.png";
import SignInImage from "../../assets/svg/Auth";
import Container from "../../components/common/Container";

const slideIn = keyframes`
    from { opacity: 0; transform: translateX(1rem); }
    to { opacity: 1; }
`;
const animationSlideIn = `${slideIn} .3s ease-in`;

const Auth = () => {
  const { pathname } = useLocation();
  const currentRoute = pathname.split("/").at(-1) as keyof typeof buttonData &
    keyof typeof headerContent;
  const [keyIndex, setKeyIndex] = useState(1);

  useEffect(() => {
    setKeyIndex((e) => e + 1);
  }, [currentRoute]);

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
          <SignInImage />

          <Flex
            alignSelf={"stretch"}
            maxW={"2xl"}
            h={"full"}
            px={"32"}
            flexDir={"column"}
            gap={"24"}
            alignItems={"space-between"}
            justifyContent={"space-between"}
          >
            <Box
              alignSelf={"end"}
              flexGrow={0}
              _focus={{
                boxShadow: "none",
              }}
              mb={"16"}
            >
              <Link to={"/"}>
                <Image src={logo} h={"14"} w={"auto"} alt={"logo"} />
              </Link>
            </Box>

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
                  {headerContent[currentRoute]?.title}
                </Heading>
                <Text
                  fontSize={"lg"}
                  textAlign={"center"}
                  color={"font.muted2"}
                >
                  {headerContent[currentRoute]?.description}
                </Text>
              </Flex>

              <Box key={keyIndex + 1} animation={animationSlideIn}>
                <Outlet />
              </Box>

              <Flex
                gap={"12"}
                alignItems={"baseline"}
                justifyContent={"center"}
                justifySelf={"flex-end"}
              >
                <Text fontSize={"lg"} color={"font.muted2"}>
                  Don't have an account?
                </Text>
                <Box
                  fontSize={"xl"}
                  fontWeight={"medium"}
                  color={"font.primary"}
                  onClick={(e) => e.preventDefault()}
                >
                  <Link to={buttonData[currentRoute].href}>
                    {buttonData[currentRoute].title}
                  </Link>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Grid>
      </Center>
    </Container>
  );
};

export default Auth;
