import { userTypes } from "../assets/data/auth";

export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp extends SignIn {
  type: userTypes;
}

export interface Form {
  signIn: SignIn;
  signUp: SignUp;
}
