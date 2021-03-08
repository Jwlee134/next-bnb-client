import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { SiAirbnb } from "react-icons/si";
import Button from "components/common/Button";
import { BiSearch } from "react-icons/bi";
import HeaderMenu from "./HeaderMenu";

const LeftContainer = styled.div`
  margin-left: 80px;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    margin-right: 6px;
  }
`;

const RightContainer = styled.div`
  margin-right: 80px;
  color: black;
  position: relative;
`;

const Container = styled.header<{ isTop: boolean; isHome: boolean }>`
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  transition: all 0.1s linear;
  ${({ isHome }) =>
    !isHome &&
    css`
      color: #ff395b;
      box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.08);
      background-color: white;
    `}
  ${({ isTop }) =>
    !isTop &&
    css`
      color: #ff395b;
      box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.08);
      background-color: white;
    `}
`;

const sizeDown = keyframes`
  0% {
    transform: translateY(65px) scale(1.75, 1);
  }
  100% {
    transform: translateY(0px) scale(1, 1);
  }
`;

const sizeUp = keyframes`
  0% {
    transform: translateY(0px) scale(1, 1);
  }
  100% {
    transform: translateY(65px) scale(1.75, 1);
  }
`;

const MiniSearchBar = styled.div<{ scroll: number }>`
  width: 350px;
  height: 48px;
  border: 1px solid #dddddd;
  border-radius: 24px;
  transition: all 0.2s linear;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: white;
  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  }
  span {
    color: black;
    margin-left: 18px;
  }
  button {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  animation: ${sizeDown} 0.08s linear forwards;
  ${({ scroll }) =>
    scroll === 0 &&
    css`
      animation: ${sizeUp} 0.08s linear forwards;
    `}
`;

const Header = ({ scroll, animate }: { scroll: number; animate: boolean }) => {
  const { pathname } = useRouter();

  const [showBar, setShowBar] = useState(false);

  const handleClick = () => {
    setShowBar(true);
  };

  return (
    <Container isTop={scroll === 0} isHome={pathname === "/"}>
      <Link href="/">
        <LeftContainer>
          <SiAirbnb size={32} />
          airbnb
        </LeftContainer>
      </Link>
      {pathname === "/" && animate && (
        <MiniSearchBar scroll={scroll} onClick={handleClick}>
          <span>검색 시작하기</span>
          <Button>
            <BiSearch size={18} />
          </Button>
        </MiniSearchBar>
      )}
      <RightContainer>
        <HeaderMenu />
      </RightContainer>
    </Container>
  );
};

export default Header;
