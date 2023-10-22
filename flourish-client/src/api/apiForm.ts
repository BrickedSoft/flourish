import { api } from "./config/apiConfig";
import { api as apiData } from "../assets/data/server";
import { RegistrationForm } from "../types/RegistrationForm";

export const postRegistrationForm = async (
  data: RegistrationForm
): Promise<void> => {
  await api.post(apiData.registrationForm, {
    ...data,
  });
};
