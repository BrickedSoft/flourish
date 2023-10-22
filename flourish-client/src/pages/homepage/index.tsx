import { Box } from "@chakra-ui/react";

import Hero from "./Hero";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

const Homepage = () => {
  return (
    <Box w={"full"}>
      <Header />
      <Box bg="bg.container2" pt={"32"}>
        <Hero />
      </Box>
      <Footer />
    </Box>
  );
};

export default Homepage;
