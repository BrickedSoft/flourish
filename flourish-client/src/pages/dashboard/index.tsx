import { Avatar, Box, Flex, Grid, Image } from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { navBar } from "../../assets/data/dashboard/dashboard";
import { nav, routes } from "../../assets/data/routes";
import logo from "../../assets/img/logo.png";
import Container from "../../components/common/Container";
import { useAppSelector } from "../../hooks/useStore";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";

const Dashboard = () => {
  const { pathname } = useLocation();
  const name = useAppSelector((state) => state.user.name);

  return (
    <Container pr={0} pt={"36"} h={"100vh"}>
      <Grid
        h={"full"}
        templateColumns={"auto 1fr"}
        gridTemplateRows={"auto 1fr"}
        rowGap={16}
      >
        <Flex flexDir={"column"}>
          <Link to={routes.home}>
            <Image src={logo} h={"20"} w={"auto"} alt={"logo"} />
          </Link>
        </Flex>

        <Flex
          px={32}
          gap={48}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {[...navBar.ADMIN, { href: nav.dashboard }].some(
            ({ href }) =>
              href.split("/").at(-1) === (pathname.split("/").at(-1) as string)
          ) ? (
            <NavBar />
          ) : (
            <Box></Box>
          )}

          <Avatar name={name} boxSize={"3.2rem"}></Avatar>
        </Flex>

        <Menu />

        <Flex
          bg={"bg.tintsTransparent.1"}
          borderTopRadius={"xl"}
          overflow={"hidden"}
        >
          <Container
            w={"full"}
            mx={24}
            my={24}
            bg={"white"}
            borderRadius={"xl"}
            overflowY={"scroll"}
            overflowX={"hidden"}
          >
            <Outlet />
          </Container>
        </Flex>
      </Grid>
    </Container>
  );
};

export default Dashboard;
