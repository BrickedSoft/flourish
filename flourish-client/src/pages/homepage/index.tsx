import { Box, Flex } from "@chakra-ui/react";

import Hero from "./hero";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Services from "./services/Services";

const Homepage = () => {
  return (
    <Flex flexDir={"column"} gap={96} w={"full"}>
      <Box>
        <Header />
        <Hero />
      </Box>
      <Services />
      <Footer />
    </Flex>
  );
};

export default Homepage;
