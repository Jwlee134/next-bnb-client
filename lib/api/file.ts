import { api } from ".";

export const uploadPhotoAPI = (data: FormData) => api.post("/api/file", data);
