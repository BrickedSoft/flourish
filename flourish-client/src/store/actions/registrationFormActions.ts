import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";

import {
  getCounselorList,
  getRegistrationForm,
  postRegistrationForm,
  putRegistrationForm,
} from "../../api/apiForm";
import {
  RegistrationFormFields,
  RegistrationFormTypes,
  PostRegistrationFormClientTypes,
} from "../../types/RegistrationForm";
import { options } from "../../assets/data/dashboard/registrationForm";

export const fetchRegistrationForm = createAsyncThunk(
  "registrationForm/getRegistrationForm",
  async () => {
    const data = (await getRegistrationForm()).reverse();

    const modifiedData = _.map(data, (item) => {
      const isOthers = !_.some(
        options.occupationWithoutOthers,
        (o) => o === item.occupation
      );
      return {
        ...item,
        [RegistrationFormFields.OCCUPATION]: isOthers
          ? "others"
          : item.occupation,
        [RegistrationFormFields.OCCUPATION_OTHERS]: isOthers
          ? item.occupation
          : "",
      };
    });

    return modifiedData as RegistrationFormTypes[];
  }
);

export const submitRegistrationForm = createAsyncThunk(
  "registrationForm/postRegistrationForm",
  async (data: RegistrationFormTypes) => {
    const modifiedData = _.pickBy(data, _.identity);
    return await postRegistrationForm(
      modifiedData as PostRegistrationFormClientTypes
    );
  }
);

export const editRegistrationForm = createAsyncThunk(
  "registrationForm/putRegistrationForm",
  async (data: RegistrationFormTypes) => await putRegistrationForm(data)
);

/* ----------------------------- Counselor List ----------------------------- */

export const fetchCounselorList = createAsyncThunk(
  "registrationForm/getCounselorList",
  async () => (await getCounselorList()).reverse()
);
