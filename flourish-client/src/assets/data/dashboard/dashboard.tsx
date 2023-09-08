import { RxDashboard, RxQuestionMarkCircled } from "react-icons/rx";

import { userTypes } from "../../../types/User";
import { routes } from "../routes";

export const menu = {
  [userTypes.ADMIN]: [
    {
      title: "Dashboard",
      href: routes.dashboard,
      icon: <RxDashboard fontSize={24} strokeWidth={0.1} />,
    },
    {
      title: "Questionnaires",
      href: routes.questionnaire,
      icon: <RxQuestionMarkCircled fontSize={24} strokeWidth={0.1} />,
    },
  ],
};

export const navBar = {
  [userTypes.ADMIN]: [
    { title: "Members", href: routes.members },
    { title: "Session Request", href: routes.sessionRequest },
    { title: "Overview", href: routes.overview },
  ],
};
