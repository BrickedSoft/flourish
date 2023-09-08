import { Box } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Auth from "./pages/auth";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Homepage from "./pages/homepage";
import { useAppSelector } from "./hooks/useStore";
import Dashboard from "./pages/dashboard";
import Questions from "./pages/dashboard/questionnaire";
import { nav } from "./assets/data/routes";

const App = () => {
  const isSignedIn = useAppSelector((state) => state.flags.isSignedIn);

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
          {!isSignedIn && (
            <Route path={nav.auth} element={<Auth />}>
              <Route index element={<SignIn />} />
              <Route path={nav.signIn} element={<SignIn />} />
              <Route path={nav.signUp} element={<SignUp />} />
            </Route>
          )}

          {isSignedIn && (
            <Route path={`${nav.dashboard}`} element={<Dashboard />}>
              <Route path={nav.questionnaire} element={<Questions />} />
              <Route index element={<h1>Members</h1>} />
              <Route path={nav.members} element={<h1>Members</h1>} />
              <Route
                path={nav.sessionRequest}
                element={<h1>sessionRequest</h1>}
              />
              <Route path={nav.overview} element={<h1>Overview</h1>} />
            </Route>
          )}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
