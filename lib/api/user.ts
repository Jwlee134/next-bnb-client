import { IUser } from "types/user";
import { api } from ".";

interface Body {
  avatarUrl: string | null;
  text: string;
  user: IUser;
  currentUser: IUser;
}

export const updateUserAPI = (body: Body) => api.put<IUser>("/api/user", body);
