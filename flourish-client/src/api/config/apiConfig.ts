import axios, { AxiosError, AxiosInstance } from "axios";

import { api as apiData } from "../../assets/data/server";

export const api: AxiosInstance = axios.create({
  baseURL: apiData.base,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

const errorHandler = (error: AxiosError) => {
  const { response } = error;
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

export const setupInterceptors = (token: string) => {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `token ${token}`;
    return config;
  });
};

export const resetInterceptors = () => {
  api.interceptors.request.clear();
};
