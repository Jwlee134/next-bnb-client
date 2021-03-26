import { deleteWishItemAPI, getWishlistAPI } from "lib/api/wishlist";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import useSWR from "swr";
import { IRoomDetail } from "types/room";
import { IWishlist } from "types/user";
import useUser from "./useUser";

const useWishlist = (roomId?: string) => {
  const { user } = useUser();
  const { data: wishlist, mutate: mutateWishlist } = useSWR<IWishlist[]>(
    user && user.isLoggedIn ? `/api/wishlist?id=${user._id}` : null
  );
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);

  const handleItem = async () => {
    if (!roomId) return;
    dispatch(commonActions.setClickedRoomId(roomId as string));
    if (liked) {
      setLiked(false);
      try {
        const listId = await new Promise<string>((resolve) => {
          wishlist?.forEach((list) => {
            if (list.list.some((item: IRoomDetail) => item._id === roomId)) {
              resolve(list._id);
            }
          });
        });
        await deleteWishItemAPI({ roomId, listId });
        await mutateWishlist(async () => {
          const { data } = await getWishlistAPI(user?._id);
          return data;
        }, false);
      } catch (error) {
        alert(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (!wishlist || isEmpty(wishlist)) return;
    setLiked(false);
    wishlist.forEach((list) => {
      if (list.list.some((item: IRoomDetail) => item._id === roomId)) {
        setLiked(true);
      }
    });
  }, [wishlist]);

  return { user, liked, wishlist, mutateWishlist, handleItem };
};

export default useWishlist;
