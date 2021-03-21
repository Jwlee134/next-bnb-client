import { IWishlist } from "types/user";
import { api } from ".";

export const createWishlistAPI = ({
  title,
  id,
}: {
  title: string;
  id: string;
}) => api.post<IWishlist>("/api/wishlist", { title, id });

export const getWishlistAPI = (id: string) =>
  api.get<IWishlist[]>(`/api/wishlist?id=${id}`);

export const addWishItemAPI = ({
  roomId,
  listId,
}: {
  roomId: string;
  listId: string;
}) => api.post("/api/wishlist/item", { roomId, listId });

export const deleteWishItemAPI = () => api.delete(`/api/wishlist/item`);
