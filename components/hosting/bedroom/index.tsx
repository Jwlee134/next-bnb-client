import React from "react";
import styled from "styled-components";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import Footer from "../Footer";

const Container = styled.div``;

const SelectorContainer = styled.div`
  width: 320px;
  margin-bottom: 32px;
`;

const Bedroom = () => {
  const {} = useSelector((state) => state.hosting);
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <h1>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h1>
        <h2>2단계</h2>
        <h3>
          모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지
          확인하세요.
        </h3>
      </Container>
      <Footer nextHref="/become-a-host/bathroom" />
    </>
  );
};

export default Bedroom;
