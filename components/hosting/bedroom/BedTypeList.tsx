import React from "react";
import { useSelector } from "store";
import styled from "styled-components";
import BedType from "./BedType";

const Container = styled.div``;

const BedTypeList = () => {
  const bedType = useSelector((state) => state.hosting.bedType);
  return (
    <Container>
      {bedType.map((bedroom, index) => (
        <BedType key={index} bedroom={bedroom} />
      ))}
    </Container>
  );
};

export default BedTypeList;
