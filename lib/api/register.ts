import { IHostingState, IRoomDetail } from "types/room";
import { IUser } from "types/user";
import { api } from ".";

export const registerRoomAPI = (body: IHostingState, user: IUser) =>
  api.post<IRoomDetail>("/api/register/room", { body, user });
