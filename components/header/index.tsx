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

const getEffects = (pathname: string, isTop: boolean, showMap: boolean) => {
  if (pathname === "/" && isTop) {
    return css`
      color: white;
      box-shadow: none;
      background-color: transparent;
    `;
  }
  if (pathname.includes("search")) {
    if (!showMap) {
      return css`
        > div {
          max-width: ${({ theme }) => theme.maxWidth.normal};
        }
      `;
    }
    return css`
      > div {
        padding: ${({ theme }) => theme.padding.tablet};
        max-width: initial;
      }
    `;
  }
  if (pathname === "/room/[id]") {
    return css`
      position: relative;
      > div {
        max-width: ${({ theme }) => theme.maxWidth.normal};
      }
    `;
  }
};

const Container = styled.header<ContainerProps>`
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 10;
  color: #ff395b;
  box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.08);
  background-color: white;
  transition: color 0.15s linear;
  transition: box-shadow 0.15s linear;
  transition: background-color 0.15s linear;
  > div {
    width: 100%;
    margin: 0 auto;
    padding: 0px 80px;
    max-width: ${({ theme }) => theme.maxWidth.wide};
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ${({ pathname, isTop, showMap }) => getEffects(pathname, isTop, showMap)}
  @media ${({ theme }) => theme.device.tablet} {
    > div {
      padding: ${({ theme }) => theme.padding.tablet};
    }
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

const Header = ({ useSearchBar = true }: { useSearchBar?: boolean }) => {
  const showMap = useSelector((state) => state.map.showMap);
  const showSearchBar = useSelector((state) => state.common.showSearchBar);
  const { pathname } = useRouter();

  const dispatch = useDispatch();

  const headerRef = useRef<HTMLElement>(null);

  const [scroll, setScroll] = useState(0);

  const handleScroll = (scroll: number) => setScroll(scroll);

  const schedule = rafSchd(handleScroll);

  useEffect(() => {
    if (!useSearchBar) return;
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
          {useSearchBar && <MiniSearchBar scroll={scroll} />}
          <RightContainer>
            <HeaderMenu />
          </RightContainer>
          {useSearchBar && <SearchBar scroll={scroll} />}
        </div>
      </Container>
      {useSearchBar && showSearchBar && pathname !== "/" && (
        <Background onClick={handleClick} />
      )}
    </>
  );
};

export default Header;
