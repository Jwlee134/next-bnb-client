import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div``;

const Location = () => {
  const bathroomCount = useSelector((state) => state.hosting.bathroomCount);
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <h1>숙소의 위치를 알려주세요.</h1>
        <h3>정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.</h3>
      </Container>
      <Footer nextHref="/become-a-host/location" />
    </>
  );
};

export default Location;
