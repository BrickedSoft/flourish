export const nav = {
  home: "",
  auth: "auth",
  dashboard: "dashboard",
  signIn: "signin",
  signUp: "signup",
  questionnaire: "questionnaires",
  resource: "resource",
  support: "support",
  members: "members",
  sessionRequest: "session-request",
  overview: "overview",
  create: "create",
  form: "form",
  404: "404",
};

export const routes = {
  home: `/${nav.home}`,
  auth: `/${nav.auth}`,
  signIn: `/${nav.auth}/${nav.signIn}`,
  signUp: `/${nav.auth}/${nav.signUp}`,
  dashboard: `/${nav.dashboard}`,
  questionnaire: `/${nav.dashboard}/${nav.questionnaire}`,
  createQuestionnaire: `/${nav.dashboard}/${nav.questionnaire}/${nav.create}`,
  resource: `/${nav.resource}`,
  support: `/${nav.support}`,
  members: `/${nav.dashboard}/${nav.members}`,
  sessionRequest: `/${nav.dashboard}/${nav.sessionRequest}`,
  overview: `/${nav.dashboard}/${nav.overview}`,
  form: `/${nav.dashboard}/${nav.form}`,
  fillRegistrationForm: `/${nav.dashboard}/${nav.form}/${nav.create}`,
  404: `/${nav[404]}`,
};

export const header = [
  { title: "Resources", href: routes.resource },
  {
    title: "Support",
    href: routes.support,
  },
];

export const headerNav = {
  signIn: { title: "Sign In", href: routes.signIn },
  dashboard: {
    title: "Dashboard",
    href: routes.dashboard,
  },
};

export const signOut = {
  title: "Sign Out",
  href: routes.home,
};
