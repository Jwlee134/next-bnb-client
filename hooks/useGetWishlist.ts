import { getWishlistAPI } from "lib/api/wishlist";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { wishlistActions } from "store/wishlist";
import { IUser } from "types/user";

const useGetWishlist = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const getWishlist = async () => {
    try {
      const { data } = await getWishlistAPI((user as IUser)._id);
      dispatch(wishlistActions.setWishlist(data));
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    if (!user) return;
    getWishlist();
  }, []);
};

export default useGetWishlist;
