import { useRouter } from "next/router";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import styled, { css } from "styled-components";
import palette from "styles/palette";

interface ContainerProps {
  isTop: boolean;
  opened: boolean;
  pathname: string;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  padding: 0px 24px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s linear;
  z-index: 10;
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
  ${({ opened }) =>
    opened &&
    css`
      width: calc(100% - 50px);
      label {
        input {
          background-color: ${palette.gray_f7};
        }
      }
    `}
  ${({ pathname, opened }) =>
    pathname === "/search/rooms" &&
    !opened &&
    css`
      border-bottom: 1px solid ${palette.gray_eb};
      input {
        background-color: ${palette.gray_f7};
      }
    `}
`;

const Input = ({
  scroll,
  value,
  opened,
  setValue,
  setOpened,
}: {
  scroll: number;
  value: string;
  opened: boolean;
  setValue: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    payload: string;
    type: string;
  };
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { pathname } = useRouter();
  const handleFocus = () => {
    setOpened(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <Container pathname={pathname} opened={opened} isTop={scroll === 0}>
      <label>
        <IoIosSearch size={25} />
        <input
          onFocus={handleFocus}
          type="text"
          placeholder="어디로 여행가세요?"
          value={value}
          onChange={setValue}
        />
      </label>
    </Container>
  );
};

export default Input;
