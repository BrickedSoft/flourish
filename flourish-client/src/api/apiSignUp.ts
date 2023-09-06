import { flourish } from "./config/apiConfig";

export const apiSignUp = {
  refresh: async (refresh: string) => {
    const response = await flourish.request({
      url: `api/token/refresh/`,
      method: "POST",
      data: { refresh: refresh },
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  },
};
