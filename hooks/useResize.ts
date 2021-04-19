import { throttle } from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";

const useResize = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commonActions.setInnerWidth(window.innerWidth));

    const handleResize = throttle(() => {
      dispatch(commonActions.setInnerWidth(window.innerWidth));
    }, 250);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
};

export default useResize;
