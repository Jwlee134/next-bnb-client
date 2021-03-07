import { HostingState } from "types/room";
import { api } from ".";

export const getRoomDetailAPI = (id: string) =>
  api.get<HostingState>(`/api/room/detail?id=${id}`);
