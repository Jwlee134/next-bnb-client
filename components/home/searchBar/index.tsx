import React from "react";
import styled, { css, keyframes } from "styled-components";
import palette from "styles/palette";
import Date from "./Date";
import Guest from "./Guest";
import Location from "./Location";

const fadeOut = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div<{ scroll: number; animate: boolean }>`
  width: 100%;
  max-width: 850px;
  height: 64px;
  background-color: white;
  box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.15), 0px 3px 8px rgba(0, 0, 0, 0.1);
  border-radius: 32px;
  margin: 0 auto;
  display: flex;
  position: relative;
  ${({ animate, scroll }) =>
    animate &&
    scroll === 0 &&
    css`
      animation: ${fadeOut} 0.08s linear;
    `}
  .search-container {
    position: relative;
    flex-grow: 1.5;
    height: 100%;
  }
  .search-date {
    flex-grow: 1.3;
  }
  .search-item {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 30px;
    border-radius: 32px;
    &:hover {
      background-color: ${palette.gray_eb};
    }
    cursor: pointer;
  }
  .search-text {
    font-size: 14px;
  }
  .search-item-popup-opened {
    box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.15),
      0px 3px 8px rgba(0, 0, 0, 0.1);
    &:hover {
      background-color: white !important;
    }
  }
`;

const Divider = styled.div`
  width: 1px;
  background-color: ${palette.gray_eb};
  height: 28px;
  margin: auto 0;
`;

const SearchBar = ({
  scroll,
  animate,
}: {
  scroll: number;
  animate: boolean;
}) => {
  return (
    <Container scroll={scroll} animate={animate}>
      <Location />
      <Divider />
      <Date />
      <Divider />
      <Guest />
    </Container>
  );
};

export default SearchBar;
