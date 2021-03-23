import { deleteWishItemAPI, getWishlistAPI } from "lib/api/wishlist";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { commonActions } from "store/common";
import { wishlistActions } from "store/wishlist";
import { IRoomDetail } from "types/room";
import { IUser } from "types/user";

const useWishlist = (id: string) => {
  const user = useSelector((state) => state.user.user);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const detail = useSelector((state) => state.wishlist.detail);
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  const [isLiked, setIsLiked] = useState(false);

  const handleWishlist = async () => {
    dispatch(commonActions.setClickedRoomId(id));
    if (isLiked) {
      setIsLiked(false);
      try {
        const listId = await new Promise<string>((resolve) => {
          wishlist.forEach((list) => {
            if (list.list.some((item: IRoomDetail) => item._id === id)) {
              resolve(list._id);
            }
          });
        });
        await deleteWishItemAPI({ roomId: id, listId });
        const { data } = await getWishlistAPI((user as IUser)._id);
        dispatch(wishlistActions.setWishlist(data));
      } catch (error) {
        alert(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (!detail && pathname === "/wishlists/[id]") return;
    wishlist.forEach((list) => {
      if (list.list.some((item: IRoomDetail) => item._id === id)) {
        setIsLiked(true);
      }
    });
  }, [wishlist, detail]);

  return { isLiked, handleWishlist };
};

export default useWishlist;
