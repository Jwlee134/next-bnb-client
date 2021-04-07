import React from "react";
import { useSelector } from "store";
import BedType from "./BedType";

const BedTypeList = () => {
  const bedType = useSelector((state) => state.hosting.bedType);
  return (
    <>
      {bedType.map((bedroom, index) => (
        <BedType key={index} bedroom={bedroom} />
      ))}
    </>
  );
};

export default BedTypeList;
