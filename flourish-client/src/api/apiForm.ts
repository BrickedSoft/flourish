import { api } from "./config/apiConfig";
import { api as apiData } from "../assets/data/server";
import { RegistrationFormTypes } from "../types/RegistrationForm";

export const getRegistrationForm = async (): Promise<
  RegistrationFormTypes[]
> => {
  return (await api.get(apiData.registrationForm, {})).data;
};

export const postRegistrationForm = async (
  data: RegistrationFormTypes
): Promise<void> => {
  await api.post(apiData.registrationForm, {
    ...data,
  });
};
