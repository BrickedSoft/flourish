import { Avatar, Box, Flex, Grid, Heading, Image } from "@chakra-ui/react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import _ from "lodash";

import { menu, navBar } from "../../../assets/data/dashboard/dashboard";
import { questionnaireHeader } from "../../../assets/data/dashboard/questionnaire";
import { nav, routes } from "../../../assets/data/routes";
import logo from "../../../assets/img/logo.png";
import Container from "../../../components/common/Container";
import Menu from "../../../components/dashboard/Menu";
import NavBar from "../../../components/dashboard/NavBar";
import { useAppSelector } from "../../../hooks/useStore";

const AdminDashboard = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const name = useAppSelector((state) => state.user.name);
  const questionnaireName = useAppSelector((state) => {
    const questionnaires = state.questionnaire.questionnaires;
    const filteredQuestionnaires = _.filter(
      questionnaires,
      function (questionnaire) {
        return questionnaire.id === id;
      }
    )[0]?.name;
    return filteredQuestionnaires;
  });

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
      [...navBar.ADMIN, { href: nav.dashboard }].some(
        ({ href }) =>
          href
            .split("/")
            .filter((path) => path !== "")
            .at(-1) === path
      )
    )
      return <NavBar data={navBar.ADMIN} indexMenu={nav.overview} />;
    else if (paths.includes(nav.questionnaire)) {
      if (path === nav.questionnaire)
        return headerTitle(questionnaireHeader.list);

      if (path === nav.create) return headerTitle(questionnaireHeader.new);
      return <Box>{headerTitle(questionnaireName)}</Box>;
    }
    return <Box></Box>;
  };

  return (
    <Container pl={36} pr={0} pt={36} h={"100vh"}>
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

        <Menu data={menu.ADMIN} />

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

export default AdminDashboard;
