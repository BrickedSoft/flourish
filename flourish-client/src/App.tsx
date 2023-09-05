import { Box } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { customLayoutPaths } from "./assets/data/app";
import Auth from "./pages/auth";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Homepage from "./pages/homepage";

const App = () => {
  // const currentRoute = window.location.pathname;
  // const isLayout = !customLayoutPaths.includes(currentRoute);

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      minH={"100vh"}
      h={"full"}
      w={"full"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="auth" element={<Auth />}>
            <Route index element={<SignIn />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
