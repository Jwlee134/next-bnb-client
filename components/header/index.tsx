import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { SiAirbnb } from "react-icons/si";
import Button from "components/common/Button";
import { BiSearch } from "react-icons/bi";
import SearchBar from "components/home/searchBar";
import HeaderMenu from "./HeaderMenu";

interface ContainerProps {
  isTop: boolean;
  isHome: boolean;
  miniAnimate: boolean;
  hideMiniBar: boolean;
}

interface MiniSearchBarProps {
  scroll: number;
  hideMiniBar: boolean;
  miniAnimate: boolean;
}

const fadeOut = keyframes`
  100% {
    opacity: 0;
  }
`;

const sizeDown = keyframes`
  0% {
    transform: translateY(65px) scale(1.75, 1);
    display: none;
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
    display: none;
  }
`;

const goDown = keyframes`
  100% {
    transform: translateY(0px)
  }
`;

const goUp = keyframes`
  100% {
    background-color: transparent;
    transform: translateY(-100px)
  }
`;

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

const Container = styled.header<ContainerProps>`
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
    ${({ miniAnimate }) =>
    miniAnimate
      ? css`
          &::after {
            content: "";
            position: absolute;
            top: 80px;
            background-color: white;
            height: 100px;
            width: 100%;
            z-index: -1;
            transform: translateY(-80px);
            animation: ${goDown} 0.08s linear forwards;
          }
        `
      : css`
          &::after {
            content: "";
            position: absolute;
            top: 80px;
            background-color: white;
            height: 100px;
            width: 100%;
            z-index: -1;
            animation: ${goUp} 0.08s linear forwards;
          }
        `}
`;

const MiniSearchBar = styled.div<MiniSearchBarProps>`
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
  ${({ scroll }) =>
    scroll !== 0
      ? css`
          animation: ${sizeDown} 0.07s linear forwards;
        `
      : css`
          animation: ${sizeUp} 0.07s linear forwards !important;
        `}
  ${({ miniAnimate }) =>
    miniAnimate
      ? css`
          animation: ${sizeUp} 0.07s linear forwards;
        `
      : css`
          animation: ${sizeDown} 0.07s linear forwards;
        `}
`;

const SearchBarContainer = styled.div`
  position: absolute;
  top: 80px;
  padding: 0px 80px;
  width: 100%;
  height: 64px;
`;

const Header = ({ scroll, animate }: { scroll: number; animate: boolean }) => {
  const { pathname } = useRouter();

  const headerRef = useRef<HTMLElement>(null);

  const [hideMiniBar, setHideMiniBar] = useState(false);
  const [miniAnimate, setMiniAnimate] = useState(false);

  const handleClick = () => {
    setMiniAnimate(true);
    setTimeout(() => {
      setHideMiniBar(true);
    }, 70);
  };

  useEffect(() => {
    if (scroll === 0) {
      setMiniAnimate(false);
      setTimeout(() => {
        setHideMiniBar(false);
      }, 70);
    }
  }, [scroll]);

  const handleMouseDown = (e: MouseEvent) => {
    if (!headerRef.current?.contains(e.target as Node)) {
      setMiniAnimate(false);
      setTimeout(() => {
        setHideMiniBar(false);
      }, 70);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
  }, []);

  return (
    <>
      <Container
        isTop={scroll === 0}
        miniAnimate={miniAnimate}
        isHome={pathname === "/"}
        hideMiniBar={hideMiniBar}
        ref={headerRef}
      >
        <Link href="/">
          <LeftContainer>
            <SiAirbnb size={32} />
            airbnb
          </LeftContainer>
        </Link>
        {pathname === "/" && animate && !hideMiniBar && (
          <MiniSearchBar
            scroll={scroll}
            hideMiniBar={hideMiniBar}
            miniAnimate={miniAnimate}
            onClick={handleClick}
          >
            <span>검색 시작하기</span>
            <Button>
              <BiSearch size={18} />
            </Button>
          </MiniSearchBar>
        )}
        <RightContainer>
          <HeaderMenu />
        </RightContainer>
        <SearchBarContainer>
          <SearchBar animate={animate} hideMiniBar={hideMiniBar} />
        </SearchBarContainer>
      </Container>
    </>
  );
};

export default Header;
