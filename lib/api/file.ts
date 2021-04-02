import { api } from ".";

interface Body {
  data: FormData;
  location: "room" | "avatar";
}

export const uploadPhotoAPI = ({ data, location }: Body) =>
  api.post<string[]>(`/api/file?location=${location}`, data);

export const deletePhotoAPI = (key: string, location: string) =>
  api.delete(`/api/file?key=${key}&location=${location}`);
