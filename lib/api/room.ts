import { ParsedUrlQuery } from "node:querystring";
import { IHostingState, IRoomDetail } from "types/room";
import querystring from "querystring";
import { api } from ".";

interface ISearchResults {
  data: IRoomDetail[];
  originalLength: number;
}

export const registerRoomAPI = (body: IHostingState) =>
  api.post<IRoomDetail>("/api/register/room", { body });

export const updateRoomAPI = (body: IHostingState, id: string) =>
  api.put<IRoomDetail>(`/api/register/${id}`, { body });

export const deleteRoomAPI = (id: string) =>
  api.delete<IRoomDetail>(`/api/register/${id}`);

export const getRoomDetailAPI = (id: string) =>
  api.get<IRoomDetail>(`/api/room/detail?id=${id}`);

export const searchRoomAPI = (query: ParsedUrlQuery) =>
  api.get<ISearchResults>(`/api/room/search?${querystring.stringify(query)}`);
