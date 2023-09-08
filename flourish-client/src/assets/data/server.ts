import { userTypes } from "../../types/User";

export const api = {
  base: "https://flourish.onrender.com/",
  signUp: {
    [userTypes.CLIENT]: "client/signup/",
    [userTypes.ADMIN]: "adminCounselor/signup/",
    [userTypes.COUNSELOR]: "counselor/signup/",
  },
  signIn: "login/",
};
