import React from "react";
import { BiWon } from "react-icons/bi";
import styled from "styled-components";
import palette from "styles/palette";
import { addComma } from "utils";

const Container = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  span {
    margin: 0px 8px;
  }
  p {
    margin: 0 auto;
    font-weight: 300;
  }
  .price-input_item {
    width: 170px;
    height: 56px;
    border: 1px solid ${palette.gray_b0};
    border-radius: 8px;
    padding: 8px;
    position: relative;
    .price-input_item-title {
      font-size: 13px;
      font-weight: 300;
      opacity: 0.7;
      margin-bottom: 3px;
    }
    .price-input_item-box {
      display: flex;
      flex-grow: 1;
      align-items: center;
      span {
        margin-left: 0;
        margin-right: 5px;
        display: flex;
        align-items: center;
      }
      svg {
        opacity: 0.7;
      }
      input {
        all: unset;
        font-weight: 300;
        font-size: 15px;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 8px;
        &:focus {
          box-shadow: 0 0 0 1px black;
        }
        padding: 27px 10px 10px 30px;
        box-sizing: border-box;
      }
    }
  }
`;

const PriceInput = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: {
  minPrice: string;
  maxPrice: string;
  setMinPrice: (
    value: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;
  setMaxPrice: (
    value: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value.replace(/[^0-9]/g, ""));
  };
  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value.replace(/[^0-9]/g, ""));
  };

  return (
    <Container>
      <div className="price-input_item">
        <div className="price-input_item-title">최저 요금</div>
        <div className="price-input_item-box">
          <span>
            <BiWon />
          </span>
          <input
            type="text"
            onChange={handleMinPrice}
            value={addComma(minPrice)}
            maxLength={11}
          />
        </div>
      </div>
      <span>-</span>
      <div className="price-input_item">
        <div className="price-input_item-title">최고 요금</div>
        <div className="price-input_item-box">
          <span>
            <BiWon />
          </span>
          <input
            type="text"
            onChange={handleMaxPrice}
            value={addComma(maxPrice)}
            maxLength={11}
          />
        </div>
      </div>
    </Container>
  );
};

export default React.memo(PriceInput);
