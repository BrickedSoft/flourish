import { api as apiData } from "../assets/data/server";
import { SignInTypes, SignUpTypes } from "../types/Form";
import { UserTypes } from "../types/User";
import { api } from "./config/apiConfig";

export const apiSignIn = async (data: SignInTypes): Promise<UserTypes> => {
  const response = await api.post(apiData.signIn, {
    ...data,
  });

  return response.data;
};

export const apiSignUp = async (data: SignUpTypes): Promise<void> => {
  await api.post(apiData.signUp[data.type], {
    ...(data as SignInTypes),
  });
};
