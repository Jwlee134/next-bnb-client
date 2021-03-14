import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import RoomType from "./RoomType";
import Price from "./Price";
import Others from "./Others";

const Container = styled.div`
  display: flex;
  .filter-title {
    padding: 10px 15px;
    border: 1px solid ${palette.gray_b0};
    border-radius: 32px;
    font-weight: 300;
    font-size: 15px;
    outline: none;
    background-color: white;
    cursor: pointer;
    &:hover {
      border-color: ${palette.gray_71};
    }
  }
  .filter-popup {
    width: 360px;
    background-color: white;
    position: absolute;
    z-index: 2;
    box-shadow: 0px 10px 37px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    top: 55px;
  }
`;

const SearchFilter = () => {
  return (
    <Container>
      <RoomType />
      <Price />
      <Others />
    </Container>
  );
};

export default SearchFilter;
