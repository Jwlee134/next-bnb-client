import Counter from "components/common/Counter";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { searchActions } from "store/search";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div`
  padding: 0px 24px;
  > div {
    max-width: 100%;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.gray_eb};
  margin: 18px 0px;
`;

const Guest = () => {
  const adults = useSelector((state) => state.search.adults);
  const children = useSelector((state) => state.search.children);
  const infants = useSelector((state) => state.search.infants);
  const dispatch = useDispatch();

  const handleAdults = (value: number) => {
    dispatch(searchActions.setAdults(value));
  };
  const handleChildren = (value: number) => {
    dispatch(searchActions.setChildren(value));
  };
  const handleInfants = (value: number) => {
    dispatch(searchActions.setInfants(value));
  };

  return (
    <Container>
      <Counter
        label="성인"
        value={adults}
        onClick={handleAdults}
        subLabel="만 13세 이상"
      />
      <Divider />
      <Counter
        label="어린이"
        value={children}
        onClick={handleChildren}
        disableValue={0}
        subLabel="2~12세"
      />
      <Divider />
      <Counter
        label="유아"
        value={infants}
        onClick={handleInfants}
        disableValue={0}
        subLabel="2세 미만"
      />
    </Container>
  );
};

export default Guest;
