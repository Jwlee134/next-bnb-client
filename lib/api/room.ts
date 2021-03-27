import { ParsedUrlQuery } from "node:querystring";
import { IHostingState, IRoom } from "types/room";
import { makeQueryString } from "utils";
import { api } from ".";

interface ISearchResults {
  data: IRoom[];
  originalLength: number;
}

export const registerRoomAPI = (body: IHostingState) =>
  api.post<IRoom>("/api/room", { body });

export const updateRoomAPI = (body: IHostingState, id: string) =>
  api.put<IRoom>(`/api/room/${id}`, { body });

export const deleteRoomAPI = (id: string) => api.delete(`/api/room/${id}`);

export const searchRoomAPI = (query: ParsedUrlQuery) =>
  api.get<ISearchResults>(`/api/room/search${makeQueryString(query)}`);
