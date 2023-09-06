import { nav } from "./nav";

export enum userTypes {
  Admin = "Admin",
  Client = "Client",
  Counselor = "Counselor",
}

export const headerContent = {
  auth: {
    title: "Welcome Back!",
    description:
      "To keep connected with us please sign in with your personal info.",
  },
  signin: {
    title: "Welcome Back!",
    description:
      "To keep connected with us please sign in with your personal info.",
  },
  signup: {
    title: "Welcome to Flourish!",
    description:
      "Flourish connects you with AI to enhance your mental wellbeing. Sign up now to get started.",
  },
};

export const buttonData = {
  auth: {
    title: "Sign Up",
    href: nav.signUp,
  },
  signin: {
    title: "Sign Up",
    href: nav.signUp,
  },
  signup: {
    title: "Sign In",
    href: nav.signIn,
  },
};
