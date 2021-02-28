import { User } from "models/User";
import { axios } from ".";

interface SignUpBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: string;
}

export const signUpAPI = (body: SignUpBody) =>
  axios.post<User>("/api/auth/signUp", body);
