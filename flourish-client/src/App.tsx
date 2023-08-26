import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Homepage from "./pages/homepage";
import Login from "./pages/login";

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
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </Box>
  );
};

export default App;
