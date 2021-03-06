import { HostingState } from "types/room";
import { IUser } from "types/user";
import { api } from ".";

export const registerRoomAPI = (body: HostingState, user: IUser) =>
  api.post("/api/register/room", { body, user });
