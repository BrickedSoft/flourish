import { ReactNode, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

import { navBar } from "../../../assets/data/dashboard/dashboard";
import { nav } from "../../../assets/data/routes";

const NavBar = () => {
  const { pathname } = useLocation();
  const [currentRoute, setCurrentRoute] = useState<string>("#");

  useEffect(() => {
    const newRoute =
      (pathname.split("/").at(-1) as string) ||
      (pathname.split("/").at(-2) as string);

    setCurrentRoute(newRoute === nav.dashboard ? nav.members : newRoute);
  }, [pathname]);

  console.log(currentRoute)

  const renderLink = ({
    title,
    href,
  }: {
    title: string;
    href: string;
  }): ReactNode => (
    <Link key={title} to={href}>
      <Box
        display={"inline-block"}
        letterSpacing={"-.25px"}
        textDecoration={"none"}
        whiteSpace={"nowrap"}
        fontSize={"xl"}
        fontWeight={"medium"}
        pt={"0.6rem"}
        pb={"0.5rem"}
        borderBottom={"1px solid transparent"}
        transition={"all .3s"}
        color={
          currentRoute === href.split("/").at(-1)
            ? "font.heroLight"
            : "font.muted2"
        }
        textShadow={
          currentRoute === href.split("/").at(-1)
            ? "0 0.2rem 0.4rem rgba(28, 126, 214, 0.25)"
            : ""
        }
        boxShadow={
          currentRoute === href.split("/").at(-1)
            ? "0 0.2rem 0 -0.1rem rgba(28, 126, 214, 0.5)"
            : ""
        }
        _hover={{
          color: "font.heroLight",
          textShadow: "0 0.4rem 0.8rem rgba(28, 126, 214, 0.25)",
          boxShadow: "0 0.4rem 0 -0.2rem rgba(28, 126, 214, 0.5)",
        }}
      >
        {title}
      </Box>
    </Link>
  );

  return (
    <Flex px={32} gap={48} alignItems={"center"}>
      {navBar.adminCounselor.map(renderLink)}
    </Flex>
  );
};

export default NavBar;
