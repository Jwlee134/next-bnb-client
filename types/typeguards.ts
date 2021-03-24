import { DetailOptions } from "components/common/Checkbox";

export const isDetailOptions = (
  option: string | DetailOptions
): option is DetailOptions => {
  return (option as DetailOptions).label !== undefined;
};
