import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";

const useWishlist = (id: string) => {
  const dispatch = useDispatch();

  const handleWishlist = async () => {
    dispatch(commonActions.setClickedRoomId(id));
  };

  useEffect(() => {}, []);

  return { handleWishlist };
};

export default useWishlist;
