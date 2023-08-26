import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { customLayoutPaths } from "./assets/data/app";

const App = () => {
  const currentRoute = window.location.pathname;
  const isLayout = !customLayoutPaths.includes(currentRoute);

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
        {isLayout && <Header />}

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        {isLayout && <Footer />}
      </BrowserRouter>
    </Box>
  );
};

export default App;
