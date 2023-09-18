import { Box, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

import { menu } from "../../assets/data/dashboard/dashboard";
import { signOut as signOutTitle } from "../../assets/data/routes";
import { useSignOut } from "../../hooks/useSignOut";

const Menu = ({ data }: { data: typeof menu.ADMIN }) => {
  const { signOut } = useSignOut();
  const { pathname } = useLocation();
  const allPaths = pathname.split("/").filter((path) => path !== "");

  const renderMenu = ({
    title,
    href,
    icon,
    exclude,
    activeEffect = true,
    onclick,
  }: {
    title: string;
    href: string;
    icon?: ReactNode;
    exclude?: string[];
    activeEffect?: boolean;
    onclick?: () => void;
  }): React.ReactNode => {
    const isActive =
      activeEffect &&
      allPaths.includes(href.split("/").at(-1) as string) &&
      !allPaths?.some((path) => exclude?.includes(path));

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
          bg={isActive ? "bg.tintsTransparent.2" : ""}
          color={isActive ? "font.heroLight" : "font.muted"}
          _hover={{
            bg: "bg.tintsTransparent.2",
            color: "font.heroLight",
          }}
        >
          <Box
            color={isActive ? "font.heroLight" : "font.muted2"}
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
    <Flex
      py={48}
      ml={-16}
      pr={16}
      flexDir={"column"}
      justifyContent={"space-between"}
    >
      <Flex flexDir={"column"} gap={8}>
        {data.map(renderMenu)}
      </Flex>
      {renderMenu({
        ...signOutTitle,
        icon: <IoLogOutOutline fontSize={28} />,
        activeEffect: false,
        onclick: () => signOut(),
      })}
    </Flex>
  );
};

export default Menu;
