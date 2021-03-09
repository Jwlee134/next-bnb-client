import { IHostingState, IRoomDetail } from "types/room";
import { IUser } from "types/user";
import { makeQueryString } from "utils";
import { api } from ".";

interface QueryObject {
  latitude: string | string[] | undefined;
  longitude: string | string[] | undefined;
  checkIn: string | string[] | undefined;
  checkOut: string | string[] | undefined;
  adults: string | string[] | undefined;
  children: string | string[] | undefined;
  infants: string | string[] | undefined;
}

export const registerRoomAPI = (body: IHostingState, user: IUser) =>
  api.post<IRoomDetail>("/api/register/room", { body, user });

export const getRoomDetailAPI = (id: string) =>
  api.get<IRoomDetail>(`/api/room/detail?id=${id}`);

export const searchRoomAPI = (queryObject: QueryObject) =>
  api.get(makeQueryString("/api/room/search", queryObject));
