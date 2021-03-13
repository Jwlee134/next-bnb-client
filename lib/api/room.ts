import { ParsedUrlQuery } from "node:querystring";
import { IHostingState, IRoomDetail } from "types/room";
import { IUser } from "types/user";
import querystring from "querystring";
import { api } from ".";

interface ISearchResults {
  data: IRoomDetail[];
  originalLength: number;
}

export const registerRoomAPI = (body: IHostingState, user: IUser) =>
  api.post<IRoomDetail>("/api/register/room", { body, user });

export const getRoomDetailAPI = (id: string) =>
  api.get<IRoomDetail>(`/api/room/detail?id=${id}`);

export const searchRoomAPI = (query: ParsedUrlQuery) =>
  api.get<ISearchResults>(`/api/room/search?${querystring.stringify(query)}`);
