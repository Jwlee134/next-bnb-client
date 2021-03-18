import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { SiAirbnb } from "react-icons/si";
import SearchBar from "components/header/searchBar";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import rafSchd from "raf-schd";
import HeaderMenu from "./HeaderMenu";
import MiniSearchBar from "./miniSearchBar";

interface ContainerProps {
  isTop: boolean;
  pathname: string;
  showMap: boolean;
}

const LeftContainer = styled.div`
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
  color: black;
  position: relative;
`;

const Container = styled.header<ContainerProps>`
  @media screen and (max-width: 1023px) {
    > div {
      padding: 0px 24px !important;
    }
  }
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  transition: color 0.15s linear;
  transition: box-shadow 0.15s linear;
  transition: background-color 0.15s linear;
  ${({ pathname, isTop }) =>
    pathname !== "/" || !isTop
      ? css`
          color: #ff395b;
          box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.08);
          background-color: white;
        `
      : css``}
  ${({ pathname }) =>
    pathname === "/room/[id]" &&
    css`
      position: relative;
      > div {
        max-width: 1280px !important;
      }
    `}
  > div {
    width: 100%;
    max-width: 1760px;
    padding: 0px 80px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${({ pathname, showMap }) =>
      pathname.includes("search") &&
      css`
        padding: ${showMap ? "0px 24px" : "0px 80px"};
        max-width: ${showMap && "inherit"};
      `}
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: 80px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const Header = () => {
  const showMap = useSelector((state) => state.common.showMap);
  const showSearchBar = useSelector((state) => state.common.showSearchBar);
  const { pathname } = useRouter();

  const dispatch = useDispatch();

  const headerRef = useRef<HTMLElement>(null);

  const [scroll, setScroll] = useState(0);

  const handleScroll = (scroll: number) => setScroll(scroll);

  const schedule = rafSchd(handleScroll);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      schedule(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        schedule(window.scrollY);
      });
    };
  }, []);

  const handleClick = () => {
    dispatch(commonActions.setScaleDown(true));
    dispatch(commonActions.setShowMiniSearchBar(true));
    dispatch(commonActions.setShowSearchBar(false));
    setTimeout(() => {
      dispatch(commonActions.setScaleDown(false));
    }, 80);
  };

  return (
    <>
      <Container
        showMap={showMap}
        ref={headerRef}
        isTop={scroll === 0}
        pathname={pathname}
      >
        <div>
          <Link href="/">
            <LeftContainer>
              <SiAirbnb size={32} />
              airbnb
            </LeftContainer>
          </Link>
          <MiniSearchBar scroll={scroll} />
          <RightContainer>
            <HeaderMenu />
          </RightContainer>
          <SearchBar scroll={scroll} />
        </div>
      </Container>
      {showSearchBar && pathname !== "/" && (
        <Background onClick={handleClick} />
      )}
    </>
  );
};

export default Header;
