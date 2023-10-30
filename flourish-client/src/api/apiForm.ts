import { api } from "./config/apiConfig";
import { api as apiData } from "../assets/data/server";
import {
  PostRegistrationFormClientTypes,
  RegistrationFormTypes,
} from "../types/RegistrationForm";
import { CounselorTypes } from "../types/User";

export const getRegistrationForm = async (): Promise<
  RegistrationFormTypes[]
> => {
  return (await api.get(apiData.registrationForm, {})).data;
};

export const postRegistrationForm = async (
  data: PostRegistrationFormClientTypes
): Promise<void> =>
  await api.post(apiData.registrationForm, {
    ...data,
  });

export const putRegistrationForm = async (
  data: RegistrationFormTypes
): Promise<void> => {
  await api.put(apiData.registrationForm, {
    ...data,
  });
};

/* ----------------------------- Counselor List ----------------------------- */

export const getCounselorList = async (): Promise<CounselorTypes[]> =>
  (await api.get(apiData.counselorList, {})).data;
