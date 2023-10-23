import { userTypes } from "../types/User";

export interface SignInTypes {
  email: string;
  password: string;
}

export interface SignUpTypes extends SignInTypes {
  type: userTypes;
}
