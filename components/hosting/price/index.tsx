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
    padding-left: 33px;
  }
`;

const Price = () => {
  const { price } = useSelector((state) => state.hosting);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    dispatch(hostingActions.setPrice(Number(value)));
  };

  return (
    <>
      <Container>
        <h1>숙소 요금 설정하기</h1>
        <h3>기본 요금(1박)</h3>
        <InputContainer>
          <span>￦</span>
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
