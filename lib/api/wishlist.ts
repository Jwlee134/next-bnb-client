import { IWishlist } from "types/user";
import { api } from ".";

export const createWishlistAPI = ({ title }: { title: string }) =>
  api.post<IWishlist>("/api/wishlist", { title });

export const addWishItemAPI = ({
  roomId,
  listId,
}: {
  roomId: string;
  listId: string;
}) => api.post("/api/wishlist/item", { roomId, listId });

export const deleteWishItemAPI = ({
  roomId,
  listId,
}: {
  roomId: string;
  listId: string;
}) =>
  api.delete<IWishlist>(`/api/wishlist/item?roomId=${roomId}&listId=${listId}`);

export const deleteWishlistAPI = (id: string) =>
  api.delete(`/api/wishlist/${id}`);

export const updateWishlistAPI = ({
  title,
  listId,
}: {
  title: string;
  listId: string;
}) => api.patch<IWishlist>(`/api/wishlist/${listId}`, { title });
