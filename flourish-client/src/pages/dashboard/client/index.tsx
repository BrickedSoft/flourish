import { Avatar, Box, Flex, Grid, Heading, Image } from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { nav, routes } from "../../../assets/data/routes";
import logo from "../../../assets/img/logo.png";
import Container from "../../../components/common/Container";
import Menu from "../../../components/dashboard/Menu";
import { useAppSelector } from "../../../hooks/useStore";
import { menu, navBar } from "../../../assets/data/dashboard/dashboard";
import { formHeader } from "../../../assets/data/dashboard/registrationForm";
import { questionnaireHeader } from "../../../assets/data/dashboard/questionnaire";
import NavBar from "../../../components/dashboard/NavBar";

const ClientDashboard = () => {
  const { pathname } = useLocation();
  const name = useAppSelector((state) => state.user.name);

  const headerTitle = (title: string) => (
    <Heading
      fontSize={"2xl"}
      fontWeight={"semibold"}
      letterSpacing={"tight"}
      color={"font.primary"}
    >
      {title}
    </Heading>
  );

  const header = () => {
    const paths = pathname.split("/").filter((path) => path !== "");
    const path = paths.at(-1);

    if (
      [...navBar.CLIENT, { href: nav.dashboard }].some(
        ({ href }) =>
          href
            .split("/")
            .filter((path) => path !== "")
            .at(-1) === path
      )
    )
      return <NavBar data={navBar.CLIENT} indexMenu={nav.overview} />;
    else if (paths.includes(nav.form)) {
      if (path === nav.form) return headerTitle(formHeader.form);
      return <Box>{headerTitle(formHeader.form)}</Box>;
    } else if (paths.includes(nav.questionnaire)) {
      if (path === nav.questionnaire)
        return headerTitle(questionnaireHeader.list);
      return <Box>{headerTitle(questionnaireHeader.fill)}</Box>;
    }
    return <Box></Box>;
  };

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
          px={36}
          gap={48}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {header()}
          <Avatar name={name} boxSize={"3.2rem"}></Avatar>
        </Flex>

        <Menu data={menu.CLIENT} />

        <Flex
          bg={"bg.tintsTransparent.1"}
          borderTopRadius={"xl"}
          overflow={"hidden"}
        >
          <Flex
            w={"full"}
            mx={24}
            my={24}
            px={32}
            bg={"white"}
            borderRadius={"xl"}
            overflowY={"scroll"}
            overflowX={"hidden"}
          >
            <Outlet />
          </Flex>
        </Flex>
      </Grid>
    </Container>
  );
};

export default ClientDashboard;
