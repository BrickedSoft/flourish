export enum userTypes {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  COUNSELOR = "COUNSELOR",
}

export interface UserTypes {
  token: string;
  email: string;
  name: string;
  adminCounselor: string | null;
  counselor: string | null;
  client: string | null;
}

export type CounselorTypes = {
  id: string;
  email: string;
  name: string;
  user: string;
};
