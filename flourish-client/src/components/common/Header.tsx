import { Link, Box, List, Image } from "@chakra-ui/react";

import logo from "../../assets/img/logo.png";
import { nav } from "../../assets/data/header";

const Header = () => {
  const renderedLinks = nav.map(({ title, href }, index) => (
    <Link
      key={index}
      href={href}
      display={"inline-block"}
      letterSpacing={".25px"}
      textDecoration={"none"}
      color={"secondary"}
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
    </Link>
  ));

  return (
    <Box
      as="header"
      w={"full"}
      h={"header"}
      fontSize={"2xl"}
      display={"grid"}
      gridTemplateColumns={"repeat(2, auto)"}
      justifyContent={"space-between"}
      alignItems={"center"}
      zIndex={"sticky"}
      _focus={{ outline: "none", boxShadow: "none" }}
    >
      <Link
        href="/"
        textDecoration={"none"}
        height={"5.2rem"}
        width={"13.8rem"}
      >
        <Image w={"full"} src={logo} alt={"logo"} />
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
      </List>
    </Box>
  );
};

export default Header;
