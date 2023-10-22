import { Box } from "@chakra-ui/react";

import Hero from "./Hero";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

const Homepage = () => {
  return (
    <>
      <Header />
      <Box w={"full"}>
        <Box bg="bg.container2" pt={"32"}>
          <Hero />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Homepage;
