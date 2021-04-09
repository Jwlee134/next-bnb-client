import { fetcher } from "lib/api";
import { deleteWishItemAPI } from "lib/api/wishlist";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import useSWR, { cache, mutate } from "swr";
import { IRoom } from "types/room";
import { IWishlist } from "types/user";
import useUser from "./useUser";

const useWishlist = (roomId?: string) => {
  const { user } = useUser();
  const { pathname } = useRouter();
  const { data: wishlist, mutate: mutateWishlist } = useSWR<IWishlist[]>(
    user && user.isLoggedIn ? `/api/wishlist?id=${user._id}` : null,
    fetcher,
    {
      revalidateOnMount: !cache.has(`/api/wishlist?id=${user?._id}`),
    }
  );
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const handleItem = async () => {
    if (!roomId) return;
    dispatch(commonActions.setClickedRoomId(roomId as string));
    if (liked && wishlist) {
      setLiked(false);
      try {
        const listId = await new Promise<string>((resolve) => {
          wishlist.forEach((list) => {
            if (list.list.some((item: IRoom) => item._id === roomId)) {
              resolve(list._id);
            }
          });
        });
        await deleteWishItemAPI({ roomId, listId });
        mutateWishlist();
        if (pathname === "/wishlists/[id]") {
          mutate(`/api/wishlist/${listId}`);
        }
      } catch (error) {
        alert(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (!wishlist || isEmpty(wishlist)) return;
    wishlist.forEach((list) => {
      if (list.list.some((item: IRoom) => item._id === roomId)) {
        setLiked(true);
      }
    });
  }, [wishlist]);

  return { user, liked, wishlist, mutateWishlist, handleItem };
};

export default useWishlist;
