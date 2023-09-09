export enum userTypes {
  ADMIN = "adminCounselor",
  CLIENT = "client",
  COUNSELOR = "counselor",
}

export interface User {
  token: string;
  email: string;
  name: string;
  adminCounselor: string | null;
  counselor: string | null;
  client: string | null;
}
