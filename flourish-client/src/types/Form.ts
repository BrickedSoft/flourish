import { userTypes } from "../types/User";

export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp extends SignIn {
  type: userTypes;
}
