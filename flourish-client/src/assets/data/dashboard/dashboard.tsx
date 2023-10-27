import { RxDashboard, RxQuestionMarkCircled } from "react-icons/rx";
import { SiReacthookform } from "react-icons/si";

import { userTypes } from "../../../types/User";
import { nav, routes } from "../routes";

export const menu = {
  [userTypes.ADMIN]: [
    {
      title: "Dashboard",
      href: routes.dashboard,
      icon: <RxDashboard fontSize={24} strokeWidth={0.1} />,
      exclude: [nav.questionnaire],
    },
    {
      title: "Questionnaires",
      href: routes.questionnaire,
      icon: <RxQuestionMarkCircled fontSize={24} strokeWidth={0.1} />,
      exclude: [],
    },
  ],
  [userTypes.CLIENT]: [
    {
      title: "Dashboard",
      href: routes.dashboard,
      icon: <RxDashboard fontSize={24} strokeWidth={0.1} />,
      exclude: [nav.form, nav.questionnaire],
    },
    {
      title: "Form",
      href: routes.form,
      icon: <SiReacthookform fontSize={24} strokeWidth={1} />,
      exclude: [],
    },
    {
      title: "Questionnaires",
      href: routes.questionnaire,
      icon: <RxQuestionMarkCircled fontSize={24} strokeWidth={0.1} />,
      exclude: [],
    },
  ],
  [userTypes.COUNSELOR]: [
    {
      title: "Dashboard",
      href: routes.dashboard,
      icon: <RxDashboard fontSize={24} strokeWidth={0.1} />,
      exclude: [],
    },
  ],
};

export const navBar = {
  [userTypes.ADMIN]: [
    { title: "Overview", href: routes.overview },
    { title: "Session Request", href: routes.sessionRequest },
  ],
  [userTypes.CLIENT]: [
    { title: "Overview", href: routes.overview },
    { title: "Form History", href: routes.formHistory },
    { title: "Filled Questionnaires", href: routes.filledQuestionnaire },
  ],
  [userTypes.COUNSELOR]: [
    { title: "Overview", href: routes.overview },
    { title: "Session Request", href: routes.sessionRequest },
  ],
};
