import { IUser } from "types/user";
import { api } from ".";

interface SignUpBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: string;
}

export const signUpAPI = (body: SignUpBody) =>
  api.post<IUser>("/api/auth/signUp", body);

export const loginAPI = (body: { email: string; password: string }) =>
  api.post("/api/auth/login", body);

export const meAPI = () => api.get("/api/auth/me");

export const logoutAPI = () => api.post("/api/auth/logout");
