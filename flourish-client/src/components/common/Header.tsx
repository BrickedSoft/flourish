import { Box, List, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { header } from "../../assets/data/nav";
import Container from "./Container";
import logo from "../../assets/img/logo.png";
import ButtonFull from "./button/ButtonFull";
import { persistor } from "../../store/store";

const Header = () => {
  const renderedLinks = header.map(({ title, href }, index) => (
    <Box
      key={index}
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
      <Link to={href}>{title}</Link>
    </Box>
  ));

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

          {/* ----------------------- TODO: Remove on production ---------------------- */}
          <ButtonFull
            px={"8"}
            py={"4"}
            onClick={async () => {
              await persistor.pause();
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
