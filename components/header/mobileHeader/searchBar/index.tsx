import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import styled, { css } from "styled-components";
import palette from "styles/palette";

interface ContainerProps {
  isTop: boolean;
  opened: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  padding: 0px 24px;
  display: flex;
  align-items: center;
  transition: all 0.2s linear;
  label {
    position: relative;
    width: 100%;
    svg {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translate(0, -50%);
    }
    input {
      font-size: 16px;
      width: 100%;
      height: 48px;
      border-radius: 30px;
      border: 0;
      outline: 0;
      padding: 0px 24px 0px 48px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  ${({ isTop }) =>
    !isTop &&
    css`
      background-color: white;
      input {
        background-color: ${palette.gray_f7};
      }
    `}
  ${({ opened }) => opened && css``}
`;

const SearchBar = ({ scroll }: { scroll: number }) => {
  const [opened, setOpened] = useState(false);

  const handleFocus = () => setOpened(true);

  return (
    <>
      <Container opened={opened} isTop={scroll === 0}>
        <label>
          <IoIosSearch size={25} />
          <input
            onFocus={handleFocus}
            type="text"
            placeholder="어디로 여행가세요?"
          />
        </label>
      </Container>
    </>
  );
};

export default SearchBar;
