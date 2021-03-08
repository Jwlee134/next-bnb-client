import { IRoomDetail } from "types/room";
import { api } from ".";

export const getRoomDetailAPI = (id: string) =>
  api.get<IRoomDetail>(`/api/room/detail?id=${id}`);
