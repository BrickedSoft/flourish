import { Status } from "./Status";

export enum userTypes {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  COUNSELOR = "COUNSELOR",
}

export interface User {
  token: string;
  name: string;
  email: string;
  status: Status;
}
