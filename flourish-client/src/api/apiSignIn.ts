import { api as apiData } from "../assets/data/server";
import { SignIn } from "../types/Form";
import { api } from "./config/apiConfig";

export const apiSignIn = async (data: SignIn) => {
  const response = await api.post(apiData.signIn.CLIENT, {
    ...data,
  });

  return response.data.token;
};
