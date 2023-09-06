import { api } from "../assets/data/server";
import { SignIn } from "../types/Form";
import { flourish } from "./config/apiConfig";

export const apiSignIn = async (data: SignIn) => {
  const response = await flourish.post(api.signIn.CLIENT, {
    ...data,
  });

  return response.data.token;
};
