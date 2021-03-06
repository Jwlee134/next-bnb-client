import Input from "components/common/Input";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import { addComma } from "utils";
import Footer from "../Footer";

const Container = styled.div``;

const InputContainer = styled.div`
  position: relative;
  span {
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0%, -50%);
    opacity: 0.7;
  }
  input {
    width: 200px;
    padding-left: 27px;
  }
`;

const Price = () => {
  const { price } = useSelector((state) => state.hosting);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // value에서 , 제거
    const withoutCommas = Number(value.replace(/,/g, ""));
    if (!withoutCommas || withoutCommas === 0) {
      // withoutCommas가 NaN 이거나 0이라면
      dispatch(hostingActions.setPrice(0));
    }
    if (withoutCommas) {
      dispatch(hostingActions.setPrice(withoutCommas));
    }
  };

  return (
    <>
      <Container>
        <h1>숙소 요금 설정하기</h1>
        <h3>기본 요금(1박)</h3>
        <InputContainer>
          <span>₩</span>
          <Input
            onChange={handleChange}
            value={addComma(String(price))}
            maxLength={16}
          />
        </InputContainer>
      </Container>
      <Footer nextHref="/become-a-host/register" />
    </>
  );
};

export default Price;
