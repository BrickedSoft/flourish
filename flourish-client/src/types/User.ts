import { Loading } from "./Loading";

export enum userTypes {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  COUNSELOR = "COUNSELOR",
}

export interface User {
  token: string;
  type: userTypes;
  name: string;
  email: string;
  loading: Loading;
}
