import { nav } from "./nav";

const headerSignIn = {
  title: "Welcome Back!",
  description:
    "To keep connected with us please sign in with your personal info.",
};

export const headerContent = {
  auth: headerSignIn,
  signin: headerSignIn,
  signup: {
    title: "Welcome to Flourish!",
    description:
      "Flourish connects you with AI to enhance your mental wellbeing. Sign up now to get started.",
  },
};

const buttonSignIn = {
  title: "Sign In",
  href: nav.signIn,
};

export const buttonData = {
  auth: buttonSignIn,
  signin: buttonSignIn,
  signup: {
    title: "Sign Up",
    href: nav.signUp,
  },
};

export const buttonDataAlternate = {
  auth: buttonData.signup,
  signin: buttonData.signup,
  signup: buttonData.signin,
};
