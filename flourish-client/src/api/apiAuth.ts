import { api as apiData } from "../assets/data/server";
import { SignIn, SignUp } from "../types/Form";
import { User } from "../types/User";
import { api } from "./config/apiConfig";

export const apiSignIn = async (data: SignIn): Promise<User> => {
  const response = await api.post(apiData.signIn, {
    ...data,
  });

  return response.data;
};

export const apiSignUp = async (data: SignUp): Promise<void> => {
  await api.post(apiData.signUp[data.type], {
    ...(data as SignIn),
  });
};
