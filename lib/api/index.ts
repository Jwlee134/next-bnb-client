import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const setAuthToken = (token: string) => {
  api.defaults.headers.common.user = "";

  if (token) {
    api.defaults.headers.common.user = token;
  }
};
