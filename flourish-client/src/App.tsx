import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import { setupInterceptors } from "./api/config/apiConfig";
import { nav } from "./assets/data/routes";
import { useAppSelector } from "./hooks/useStore";
import NotFound from "./pages/404";
import Auth from "./pages/auth";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import AdminDashboard from "./pages/dashboard/admin";
import OverView from "./pages/dashboard/admin/overview";
import Questionnaire from "./pages/dashboard/admin/questionnaire";
import QuestionnaireDetails from "./pages/dashboard/admin/questionnaire/QuestionnaireDetails";
import QuestionnaireList from "./pages/dashboard/admin/questionnaire/QuestionnaireList";
import ClientDashboard from "./pages/dashboard/client";
import Forms from "./pages/dashboard/client/form";
import RegistrationFormDetails from "./pages/dashboard/client/form/RegistrationFormDetails";
import RegistrationFormFillUp from "./pages/dashboard/client/form/RegistrationFormFillUp";
import RegistrationFormList from "./pages/dashboard/client/form/RegistrationFormList";
import CounselorDashboard from "./pages/dashboard/counselor";
import Homepage from "./pages/homepage";

const App = () => {
  const location = useLocation();
  const isSignedIn = useAppSelector((state) => state.flags.isSignedIn);
  const token = useAppSelector((state) => state.user.token);
  const [admin, client, counselor] = [
    useAppSelector((state) => state.user.adminCounselor),
    useAppSelector((state) => state.user.client),
    useAppSelector((state) => state.user.counselor),
  ];

  useEffect(() => {
    if (token) setupInterceptors(token);
  }, [token]);

  const dashboardRoutes = () => {
    if (admin)
      return (
        <Route path={`${nav.dashboard}`} element={<AdminDashboard />}>
          <Route path={nav.questionnaire} element={<Questionnaire />}>
            <Route index element={<QuestionnaireList />} />
            <Route path=":id" element={<QuestionnaireDetails />} />
          </Route>
          <Route index element={<h1>Members</h1>} />
          <Route path={nav.members} element={<h1>Members</h1>} />
          <Route path={nav.sessionRequest} element={<h1>sessionRequest</h1>} />
          <Route path={nav.overview} element={<OverView />} />
        </Route>
      );
    else if (client)
      return (
        <Route path={`${nav.dashboard}`} element={<ClientDashboard />}>
          <Route path={nav.form} element={<Forms />}>
            <Route index element={<RegistrationFormList />} />
            <Route path="create" element={<RegistrationFormFillUp />} />
            <Route path=":id" element={<RegistrationFormDetails />} />
          </Route>
        </Route>
      );
    else if (counselor)
      return (
        <Route
          path={`${nav.dashboard}`}
          element={<CounselorDashboard />}
        ></Route>
      );
  };

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
      <AnimatePresence>
        <Routes location={location} key={location.key}>
          <Route index element={<Homepage />} />
          {!isSignedIn && (
            <Route path={nav.auth} element={<Auth />}>
              <Route index element={<SignIn />} />
              <Route path={nav.signIn} element={<SignIn />} />
              <Route path={nav.signUp} element={<SignUp />} />
            </Route>
          )}

          {isSignedIn && dashboardRoutes()}
          <Route path={nav[404]} element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Box>
  );
};

export default App;
