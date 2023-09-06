import axios, { AxiosError, AxiosInstance } from "axios";
import { api } from "../../assets/data/server";

export const flourish: AxiosInstance = axios.create({
  baseURL: api.base,
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

flourish.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
