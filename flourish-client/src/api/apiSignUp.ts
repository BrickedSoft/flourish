import { api } from "../assets/data/server";
import { SignIn, SignUp } from "../types/Form";
import { flourish } from "./config/apiConfig";

export const apiSignUp = async (data: SignUp) => {
  const response = await flourish.post(api.signUp[data.type], {
    ...(data as SignIn),
  });

  return response.data;
};
