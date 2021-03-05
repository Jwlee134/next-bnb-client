import { api } from ".";

export const uploadPhotoAPI = (data: FormData) =>
  api.post<string[]>("/api/file", data);

export const deletePhotoAPI = (key: string) =>
  api.delete(`/api/file?key=${key}`);
