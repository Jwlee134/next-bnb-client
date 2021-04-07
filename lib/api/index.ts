import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const setAuthToken = (token: string) => {
  if (!api.defaults.headers.common.user) {
    api.defaults.headers.common.user = token;
  }
};
