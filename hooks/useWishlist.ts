import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { commonActions } from "store/common";
import { wishlistActions } from "store/wishlist";

const useWishlist = (id: string) => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(false);

  const handleWishlist = () => {
    if (!isLiked) {
      dispatch(commonActions.setClickedRoomId(id));
      return;
    }
    const index = wishlist.findIndex((list) => list.idList.includes(id));
    dispatch(wishlistActions.deleteItem({ index, id }));
    setIsLiked(false);
  };

  useEffect(() => {
    wishlist.forEach((list) => {
      if (list.idList.includes(id)) setIsLiked(true);
    });
  }, [wishlist]);

  return { isLiked, handleWishlist };
};

export default useWishlist;
