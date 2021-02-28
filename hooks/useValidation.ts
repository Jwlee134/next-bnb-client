import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { commonActions } from "store/common";

const useValidation = () => {
  const validation = useSelector((state) => state.common.validation);
  const dispatch = useDispatch();

  const setValidation = (value: boolean) =>
    dispatch(commonActions.setValidation(value));

  return { validation, setValidation };
};

export default useValidation;
