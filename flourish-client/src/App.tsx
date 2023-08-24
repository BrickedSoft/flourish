import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Container from "./components/common/Container";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Homepage from "./pages/homepage";

const App = () => {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      minH={"100vh"}
      w={"full"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <BrowserRouter>
        <Container
          id={"header"}
          w={"full"}
          maxW={"full"}
          px={"32"}
          bg={"bgContainer2"}
        >
          <Header />
        </Container>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <Container px={"32"} bg={"bgAsh"} maxW={"full"}>
          <Footer />
        </Container>
      </BrowserRouter>
    </Box>
  );
};

export default App;
