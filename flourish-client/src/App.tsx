import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import { setupInterceptors } from "./api/config/apiConfig";
import { nav } from "./assets/data/routes";
import RegistrationForm from "./components/form/RegistrationForm";
import { useAppSelector } from "./hooks/useStore";
import NotFound from "./pages/404";
import Auth from "./pages/auth";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import AdminDashboard from "./pages/dashboard/admin";
import OverViewAdmin from "./pages/dashboard/admin/overview";
import QuestionnaireAdmin from "./pages/dashboard/admin/questionnaire";
import QuestionnaireDetailsAdmin from "./pages/dashboard/admin/questionnaire/QuestionnaireDetails";
import QuestionnaireListAdmin from "./pages/dashboard/admin/questionnaire/QuestionnaireList";
import SessionRequest from "./pages/dashboard/admin/sessionRequest";
import ClientDashboard from "./pages/dashboard/client";
import FilledQuestionnaire from "./pages/dashboard/client/filledQuestionnaire";
import FormHistory from "./pages/dashboard/client/formHistory";
import OverviewClient from "./pages/dashboard/client/overview";
import QuestionnaireClient from "./pages/dashboard/client/questionnaire";
import CounselorDashboard from "./pages/dashboard/counselor";
import Homepage from "./pages/homepage";
import RegistrationFormDetailsClient from "./pages/dashboard/client/formHistory/RegistrationFormDetails";
import RegistrationFormList from "./pages/dashboard/client/formHistory/RegistrationFormList";
import QuestionnaireListClient from "./pages/dashboard/client/questionnaire/QuestionnaireList";
import QuestionnaireFillUpClient from "./pages/dashboard/client/questionnaire/QuestionnaireFillUp";
import FilledQuestionnaireListClient from "./pages/dashboard/client/filledQuestionnaire/FilledQuestionnaireList";
import FilledQuestionnaireDetailsClient from "./pages/dashboard/client/filledQuestionnaire/FilledQuestionnaireDetails";
import PendingFormList from "./pages/dashboard/admin/sessionRequest/PendingFormList";
import PendingForm from "./pages/dashboard/admin/sessionRequest/PendingForm";
import FormDetailsAdmin from "./pages/dashboard/admin/FormDetails";
import FilledQuestionnaireDetailsAdmin from "./pages/dashboard/admin/sessionRequest/FilledQuestionnaireDetails";
import OverviewCounselor from "./pages/dashboard/counselor/overview";
import SessionRequestCounselor from "./pages/dashboard/counselor/sessionRequest";
import PendingFormListCounselor from "./pages/dashboard/counselor/sessionRequest/PendingFormList";
import FormDetailsCounselor from "./pages/dashboard/counselor/FormDetails";
import OverviewFormListCounselor from "./pages/dashboard/counselor/overview/OverviewFormList";
import OverviewFormListAdmin from "./pages/dashboard/admin/overview/OverviewFormList";
import OverviewFormListClient from "./pages/dashboard/client/overview/OverviewFormList";

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
          <Route index element={<OverviewFormListAdmin />} />
          <Route path={nav.overview} element={<OverViewAdmin />}>
            <Route index element={<OverviewFormListAdmin />} />
            <Route path=":id" element={<FormDetailsAdmin />} />
          </Route>
          <Route path={nav.questionnaire} element={<QuestionnaireAdmin />}>
            <Route index element={<QuestionnaireListAdmin />} />
            <Route path=":id" element={<QuestionnaireDetailsAdmin />} />
          </Route>
          <Route path={nav.members} element={<h1>Members</h1>} />
          <Route path={nav.sessionRequest} element={<SessionRequest />}>
            <Route index element={<PendingFormList />} />
            <Route path=":id" element={<PendingForm />}>
              <Route index element={<FormDetailsAdmin />} />
              <Route
                path=":questionnaireId"
                element={<FilledQuestionnaireDetailsAdmin />}
              />
            </Route>
          </Route>
        </Route>
      );
    else if (client)
      return (
        <Route path={`${nav.dashboard}`} element={<ClientDashboard />}>
          <Route index element={<OverviewFormListClient />} />
          <Route path={nav.overview} element={<OverviewClient />}>
            <Route index element={<OverviewFormListClient />} />
            <Route path=":id" element={<RegistrationFormDetailsClient />} />
          </Route>
          <Route path={nav.formHistory} element={<FormHistory />}>
            <Route index element={<RegistrationFormList />} />
            <Route path=":id" element={<RegistrationFormDetailsClient />} />
          </Route>
          <Route
            path={nav.filledQuestionnaire}
            element={<FilledQuestionnaire />}
          >
            <Route index element={<FilledQuestionnaireListClient />} />
            <Route path=":id" element={<FilledQuestionnaireDetailsClient />} />
          </Route>
          <Route path={nav.form} element={<RegistrationForm />} />
          <Route path={nav.questionnaire} element={<QuestionnaireClient />}>
            <Route index element={<QuestionnaireListClient />} />
            <Route path=":id" element={<QuestionnaireFillUpClient />} />
          </Route>
        </Route>
      );
    else if (counselor)
      return (
        <Route path={`${nav.dashboard}`} element={<CounselorDashboard />}>
          <Route index element={<OverviewFormListCounselor />} />
          <Route path={nav.overview} element={<OverviewCounselor />}>
            <Route index element={<OverviewFormListCounselor />} />
            <Route path=":id" element={<FormDetailsCounselor />} />
          </Route>
          <Route
            path={nav.sessionRequest}
            element={<SessionRequestCounselor />}
          >
            <Route index element={<PendingFormListCounselor />} />
            <Route path=":id" element={<FormDetailsCounselor />} />
          </Route>
        </Route>
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
