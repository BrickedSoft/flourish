import { Box } from "@chakra-ui/react";

import Hero from "./Hero";

const Homepage = () => {
  return (
    <Box w={"full"}>
      <Box bg="bg.container2" pt={"32"}>
        <Hero />
      </Box>
    </Box>
  );
};

export default Homepage;
