import axios, { AxiosInstance } from "axios";

export type Api = {
  userData: AxiosInstance;
};

export const Http: Api = {
  userData: axios.create({
    baseURL: process.env.REACT_APP_USER_UPLOADS_API_URL,
    headers: { "Content-Type": "application/json" },
  }),
};
