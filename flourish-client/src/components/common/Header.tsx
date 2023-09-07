import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Image,
  List,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { header, headerNav } from "../../assets/data/nav";
import logo from "../../assets/img/logo.png";
import { useAppSelector } from "../../hooks/useStore";
import { persistor } from "../../store/store";
import { useSignOut } from "../../hooks/SignOut";
import Container from "./Container";
import ButtonFull from "./button/ButtonFull";

const Header = () => {
  const isSignedIn = useAppSelector((state) => state.flags.isSignedIn);
  const userName = useAppSelector((state) => state.user.name);
  const { signOut } = useSignOut();

  const renderLink = ({ title, href }: { title: string; href: string }) => (
    <Link key={title} to={href}>
      <Box
        display={"inline-block"}
        letterSpacing={"-.25px"}
        textDecoration={"none"}
        whiteSpace={"nowrap"}
        color={"secondary"}
        fontSize={"2xl"}
        fontWeight={"medium"}
        pt={"0.6rem"}
        pb={"0.5rem"}
        borderBottom={"1px solid transparent"}
        transition={"all .3s"}
        _hover={{
          borderColor: "primary",
          color: "font.heroLight",
          textShadow: "0 0.4rem 0.8rem rgba(28, 126, 214, 0.25)",
          boxShadow: "0 0.6rem 0.4rem -0.4rem rgba(28, 126, 214, 0.5)",
        }}
      >
        {title}
      </Box>
    </Link>
  );

  const renderedLinks = header.map(({ title, href }, index) =>
    renderLink({ title, href })
  );

  return (
    <Container
      id={"header"}
      w={"full"}
      maxW={"full"}
      px={"32"}
      bg={"bg.container2"}
    >
      <Box
        as="header"
        w={"full"}
        h={"header"}
        display={"grid"}
        gridTemplateColumns={"repeat(2, auto)"}
        justifyContent={"space-between"}
        alignItems={"center"}
        zIndex={"sticky"}
        _focus={{ outline: "none", boxShadow: "none" }}
      >
        <Link to={"/"}>
          <Image src={logo} h={"20"} w={"auto"} alt={"logo"} />
        </Link>

        <List
          as={"nav"}
          className={"header-page-nav-list header-nav-list"}
          listStyleType={"none"}
          display={"flex"}
          alignItems={"center"}
          columnGap={"48"}
        >
          {renderedLinks}

          {/* --------------------------- TODO: Polish later --------------------------- */}

          {isSignedIn ? (
            <Menu>
              <MenuButton
                as={Button}
                _focus={{
                  bg: "transparent",
                }}
                _hover={{
                  bg: "transparent",
                }}
                _active={{
                  bg: "transparent",
                }}
              >
                <Avatar name={userName} boxSize={"3.6rem"}>
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
              </MenuButton>
              <MenuList
                fontSize={"xl"}
                py={8}
                px={8}
                w={"40px"}
                mt={4}
                shadow={"lg"}
                borderRadius={"xl"}
                display={"flex"}
                flexDir={"column"}
                gap={4}
                outline={"none"}
              >
                <MenuItem
                  bg={"transparent"}
                  _hover={{
                    bg: "primary.50",
                    borderRadius: "md",
                  }}
                  _focus={{
                    bg: "primary.50",
                    borderRadius: "md",
                  }}
                >
                  <Link to={headerNav.dashboard.href}>
                    {headerNav.dashboard.title}
                  </Link>
                </MenuItem>
                <MenuItem
                  bg={"transparent"}
                  _hover={{
                    bg: "primary.50",
                    borderRadius: "md",
                  }}
                  _focus={{
                    bg: "primary.50",
                    borderRadius: "md",
                  }}
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            renderLink(headerNav.signIn)
          )}

          {/* ----------------------- TODO: Remove on production ---------------------- */}
          <ButtonFull
            px={"8"}
            py={"4"}
            onClick={async () => {
              persistor.pause();
              await persistor.flush();
              await persistor.purge();
            }}
          >
            Purge
          </ButtonFull>
        </List>
      </Box>
    </Container>
  );
};

export default Header;
