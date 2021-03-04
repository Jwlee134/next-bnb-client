import { api } from ".";

export const getCoordinatesAPI = (address: string) =>
  api.get(`/api/location?keyword=${address}`);
