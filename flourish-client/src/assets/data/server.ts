import { userTypes } from "../../types/User";

export const api = {
  base: "https://flourish.onrender.com/",
  signUp: {
    [userTypes.CLIENT]: "client/signup/",
    [userTypes.ADMIN]: "adminCounselor/signup/",
    [userTypes.COUNSELOR]: "counselor/signup/",
  },
  signIn: "login/",
  questionnaire: {
    [userTypes.ADMIN]: "adminCounselor/questionnaire/",
    [userTypes.CLIENT]: "/client/questionnaire/",
  },
  question: "questionnaire/",
  registrationForm: "registrationForm/",
  filledQuestionnaire: {
    [userTypes.ADMIN]: "adminCounselor/filledQuestionnaire/",
    [userTypes.CLIENT]: "client/filledQuestionnaire/",
  },
  counselorList: "counselor/",
};
