import { userTypes } from "../types/User";

export interface SignIn {
  name?: string;
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
