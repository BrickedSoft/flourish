import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import {
  accountLinks,
  companyLinks,
  contacts,
  copyright,
  socialLinks,
  supportLinks,
} from "../../assets/data/footer";
import logo from "../../assets/img/logo.png";
import Container from "./Container";

const Footer = () => {
  const renderedLinkIcons = socialLinks.map(({ icon, href }, index) => {
    return (
      <Link key={index} to={href}>
        {icon}
      </Link>
    );
  });

  const renderFooterHeading = (title: string) => (
    <Heading fontSize={"18"} fontWeight={"semibold"} color={"font.general"}>
      {title}
    </Heading>
  );

  const renderFooterLink = ({
    title,
    href,
    type,
  }: {
    title: string;
    href: string;
    type?: string;
  }) => (
    <Box
      key={title}
      fontSize={"xl"}
      color={"font.muted"}
      transition={"all .3s"}
      _hover={{
        color: "#555",
      }}
    >
      <Link to={`${type ? type + ":" : ""}${href}`}>{title}</Link>
    </Box>
  );

  return (
    <Container px={"32"} bg={"bg.ash"} maxW={"full"}>
      <Box as="footer" w={"full"} py={"64"}>
        <Grid
          gridTemplateColumns={"repeat(5, auto)"}
          alignContent={"flex-start"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <GridItem display={"flex"} flexDir={"column"} gap={"24"}>
            <Link to={"/"}>
              <Image src={logo} h={"24"} w={"auto"} alt={"logo"} />
            </Link>
            <Flex gap={"28"}>{renderedLinkIcons}</Flex>
            <Box fontSize={"lg"} color={"font.muted"} lineHeight={"tall"}>
              {copyright.map(({ data }, index) => (
                <Text key={index}>{data}</Text>
              ))}
            </Box>
          </GridItem>

          <GridItem display={"flex"} flexDir={"column"} gap={"36"}>
            {renderFooterHeading("Contact Us")}

            <Flex flexDirection="column" gap={"24"}>
              {contacts.map((item, index) => renderFooterLink(item))}
            </Flex>
          </GridItem>

          <GridItem display={"flex"} flexDir={"column"} gap={"36"}>
            {renderFooterHeading("Account")}

            <Flex flexDirection="column" gap={"24"}>
              {accountLinks.map((item, index) => renderFooterLink(item))}
            </Flex>
          </GridItem>

          <GridItem display={"flex"} flexDir={"column"} gap={"36"}>
            {renderFooterHeading("Company")}

            <Flex flexDirection={"column"} gap={"24"}>
              {companyLinks.map((item, index) => renderFooterLink(item))}
            </Flex>
          </GridItem>

          <GridItem display={"flex"} flexDir={"column"} gap={"36"}>
            {renderFooterHeading("Support")}

            <Flex flexDirection={"column"} gap={"24"}>
              {supportLinks.map((item, index) => renderFooterLink(item))}
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default Footer;
