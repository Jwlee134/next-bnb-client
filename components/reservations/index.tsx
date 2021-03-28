import Header from "components/header";
import useUser from "hooks/useUser";
import { isEmpty } from "lodash";
import Head from "next/head";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import Past from "./Past";
import Request from "./Request";
import Upcoming from "./Upcoming";

const Container = styled.div`
  padding: 36px 80px;
  width: 100%;
  > div:first-child {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 32px;
  }
  .reservations_button-container {
    border-bottom: 1px solid ${palette.gray_dd};
    margin-bottom: 16px;
  }
`;

const Button = styled.button<{ clicked: boolean }>`
  background-color: white;
  outline: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  border: 0;
  color: ${palette.gray_80};
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: ${palette.gray_f7};
  }
  ${({ clicked }) =>
    clicked &&
    css`
      color: ${palette.black};
      ::after {
        position: absolute;
        content: "";
        background-color: ${palette.black};
        width: 100%;
        height: 1px;
        left: 0;
        bottom: 0;
      }
    `}
`;

const Reservations = () => {
  const { user } = useUser("/");
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <Head>
        <title>예약 목록 · 에어비앤비</title>
      </Head>
      <Header useSearchBar={false} />
      <Container>
        <div>예약 목록</div>
        <div className="reservations_button-container">
          <Button
            clicked={currentIndex === 0}
            onClick={() => setCurrentIndex(0)}
            type="button"
          >
            예정된 예약
          </Button>
          <Button
            clicked={currentIndex === 1}
            onClick={() => setCurrentIndex(1)}
            type="button"
          >
            이전 예약
          </Button>
          {!isEmpty(user?.rooms) && (
            <Button
              clicked={currentIndex === 2}
              onClick={() => setCurrentIndex(2)}
              type="button"
            >
              예약 요청
            </Button>
          )}
        </div>
        {currentIndex === 0 && <Upcoming />}
        {currentIndex === 1 && <Past />}
        {currentIndex === 2 && <Request />}
      </Container>
    </>
  );
};

export default Reservations;
