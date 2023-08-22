import { BrowserRouter, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Header from "./components/common/Header";

const App = () => {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      minH={"100vh"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <BrowserRouter>
        <Header />
        <Routes></Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
