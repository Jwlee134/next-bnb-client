import { IUser } from "types/user";
import { api } from ".";

interface Body {
  avatarUrl: string | null;
  text: string;
  user: IUser;
}

export const updateUserAPI = (body: Body) => api.put("/api/user", body);
