import { ReactNode, useEffect, useState } from "react";
import { Box, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

import { menu, navBar } from "../../../assets/data/dashboard/dashboard";
import { nav, signOut as signOutTitle } from "../../../assets/data/routes";
import { useSignOut } from "../../../hooks/useSignOut";

const Menu = () => {
  const { signOut } = useSignOut();
  const { pathname } = useLocation();
  const [currentPath, setCurrentPath] = useState<string>("#");

  useEffect(() => {
    setCurrentPath(
      navBar.ADMIN.some(
        ({ href }) =>
          href.split("/").at(-1) === (pathname.split("/").at(-1) as string)
      )
        ? nav.dashboard
        : (pathname.split("/").at(-1) as string) ||
            (pathname.split("/").at(-2) as string)
    );
  }, [pathname]);

  const renderMenu = ({
    title,
    href,
    icon,
    active = true,
    onclick,
  }: {
    title: string;
    href: string;
    icon?: ReactNode;
    active?: boolean;
    onclick?: () => void;
  }): React.ReactNode => {
    return (
      <Link to={href} key={title} onClick={onclick}>
        <ButtonGroup
          display={"flex"}
          alignItems={"center"}
          borderRadius={"xl"}
          fontSize={"xl"}
          fontWeight={"medium"}
          gap={8}
          px={24}
          py={16}
          transition={"all .15s ease-in-out"}
          bg={
            active && currentPath === href.split("/").at(-1)
              ? "bg.tintsTransparent.2"
              : ""
          }
          color={
            active && currentPath === href.split("/").at(-1)
              ? "font.heroLight"
              : "font.muted"
          }
          _hover={{
            bg: "bg.tintsTransparent.2",
            color: "font.heroLight",
          }}
        >
          <Box
            color={
              active && currentPath === href.split("/").at(-1)
                ? "font.heroLight"
                : "font.muted2"
            }
            transition={"all .15s ease-in-out"}
            _groupHover={{
              color: "font.heroLight",
            }}
          >
            {icon}
          </Box>
          <Text>{title}</Text>
        </ButtonGroup>
      </Link>
    );
  };

  return (
    <Flex py={48} pr={32} flexDir={"column"} justifyContent={"space-between"}>
      <Flex flexDir={"column"} gap={8}>
        {menu.ADMIN.map(renderMenu)}
      </Flex>
      {renderMenu({
        ...signOutTitle,
        icon: <IoLogOutOutline fontSize={28} />,
        active: false,
        onclick: () => signOut(),
      })}
    </Flex>
  );
};

export default Menu;
