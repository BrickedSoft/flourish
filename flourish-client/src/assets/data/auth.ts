import { routes } from "./routes";

export const headerContent = {
  signIn: {
    title: "Welcome Back!",
    description:
      "To keep connected with us please sign in with your personal info.",
  },
  signUp: {
    title: "Welcome to Flourish!",
    description:
      "Flourish connects you with AI to enhance your mental wellbeing. Sign up now to get started.",
  },
};

export const footerContent = {
  signIn: {
    title: "Sign Up",
    href: routes.signUp,
    description: "Don't have an account?",
  },
  signUp: {
    title: "Sign In",
    href: routes.signIn,
    description: "Already have an account?",
  },
};

export const successMessage = {
  signIn: {
    title: "Signed in successfully!",
    description: "You're being redirected to your dashboard.",
  },
  signUp: {
    title: "Your account has been created!",
    description: "You're being redirected to the sign in page.",
  },
};
