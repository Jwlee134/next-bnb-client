import { api } from ".";

export const getPlaceAPI = (keyword: string) =>
  api.get(`/api/place?keyword=${keyword}`);
