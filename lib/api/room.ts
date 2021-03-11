import { ParsedUrlQuery } from "node:querystring";
import { IHostingState, IRoomDetail } from "types/room";
import { IUser } from "types/user";
import querystring from "querystring";
import { api } from ".";

export const registerRoomAPI = (body: IHostingState, user: IUser) =>
  api.post<IRoomDetail>("/api/register/room", { body, user });

export const getRoomDetailAPI = (id: string) =>
  api.get<IRoomDetail>(`/api/room/detail?id=${id}`);

export const searchRoomAPI = (query: ParsedUrlQuery) =>
  api.get<IRoomDetail[]>(`/api/room/search?${querystring.stringify(query)}`);
