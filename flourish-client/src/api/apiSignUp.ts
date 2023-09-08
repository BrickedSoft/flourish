import { api as apiData } from "../assets/data/server";
import { SignIn, SignUp } from "../types/Form";
import { api } from "./config/apiConfig";

export const apiSignUp = async (data: SignUp) => {
  const response = await api.post(apiData.signUp[data.type], {
    ...(data as SignIn),
  });

  return response.data;
};
