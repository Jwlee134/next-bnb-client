import { throttle } from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";

const useResize = () => {
  const dispatch = useDispatch();

  const handleResize = throttle(() => {
    dispatch(commonActions.setInnerWidth(window.innerWidth));
  }, 250);

  useEffect(() => {
    dispatch(commonActions.setInnerWidth(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};

export default useResize;
