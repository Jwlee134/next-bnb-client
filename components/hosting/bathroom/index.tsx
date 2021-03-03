import Counter from "components/common/Counter";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div``;

const Bathroom = () => {
  const bathroomCount = useSelector((state) => state.hosting.bathroomCount);
  const dispatch = useDispatch();

  const handleClick = (value: number) => {
    dispatch(hostingActions.setBathroomCount(value));
  };

  return (
    <>
      <Container>
        <h1>욕실 수</h1>
        <h3>샤워실 또는 욕조가 없는 경우 0.5개로 간주합니다.</h3>
        <Counter
          label="욕실"
          value={bathroomCount}
          onClick={handleClick}
          unitNum={0.5}
          disableValue={0}
        />
      </Container>
      <Footer nextHref="/become-a-host/location" />
    </>
  );
};

export default Bathroom;
