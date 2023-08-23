import { BrowserRouter, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      minH={"100vh"}
      w={"100vw"}
      px={"32"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <BrowserRouter>
        <Header />
        <Routes></Routes>
        <Footer />
      </BrowserRouter>
    </Box>
  );
};

export default App;
