import { Flex, Grid, GridItem, Text, Heading } from "@chakra-ui/react";

import ButtonFull from "../../components/common/button/ButtonFull";
import ButtonOutline from "../../components/common/button/ButtonOutline";
import HeroImage from "../../assets/svg/Hero";
import { heroButtonData, heroData } from "../../assets/data/homepage/hero";

const Hero = () => {
  return (
    <Grid
      className="hero"
      templateColumns="45fr 55fr"
      justifyContent="space-between"
      alignItems={"center"}
      maxW="13xl"
      mx="auto"
      pt="32"
      h={"calc(100vh - 80px)"}
    >
      <GridItem pb="12.4rem" pt="32">
        <Text
          color="primary.600"
          fontSize="14"
          fontWeight="medium"
          maxWidth="50ch"
          lineHeight="tall"
          marginBottom="12"
          letterSpacing=".25px"
        >
          {heroData.announcement}
        </Text>
        <Heading
          color="font.hero"
          fontSize="8xl"
          lineHeight="shorter"
          letterSpacing="tighter"
          fontWeight="bold"
          mb="32"
        >
          {heroData.title}
        </Heading>
        <Text
          color="font.hero"
          fontSize="16"
          fontWeight="regular"
          maxWidth="60ch"
          lineHeight="tall"
          marginBottom="48"
        >
          {heroData.description}
        </Text>
        <Flex alignItems="center" gap="16" mb="80">
          <ButtonFull py="24" px="32" fontSize="18">
            {heroButtonData[0].title}
          </ButtonFull>
          <ButtonOutline py="24" px="32" fontSize="18" onClick={(e) => {}}>
            {heroButtonData[1].title}
          </ButtonOutline>
        </Flex>
        <Text fontSize="16" fontWeight="regular" color="font.hero">
          <span style={{ fontWeight: "500" }}>Need counseling?</span> Click the
          button to get your counseling scheduled.
        </Text>
      </GridItem>

      <GridItem width="85%" justifySelf="center">
        <HeroImage />
      </GridItem>
    </Grid>
  );
};

export default Hero;
