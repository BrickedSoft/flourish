export enum userTypes {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  COUNSELOR = "COUNSELOR",
}

export interface User {
  token: string;
  email: string;
  name: string;
  adminCounselor: string | null;
  counselor: string | null;
  client: string | null;
}
