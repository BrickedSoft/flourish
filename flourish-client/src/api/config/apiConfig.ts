import axios, { AxiosError, AxiosInstance } from "axios";
import { api as apiData } from "../../assets/data/server";

export const api: AxiosInstance = axios.create({
  baseURL: apiData.base,
  timeout: 30000,
});

const errorHandler = (error: AxiosError) => {
  const { request, response, config } = error;
  const statusCode = response?.status;

  if (statusCode && statusCode === 401) {
    console.log("auth Error");
  } else if (statusCode && statusCode >= 500) {
    console.log("Server Error");
  }

  return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
