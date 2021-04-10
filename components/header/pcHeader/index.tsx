import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SiAirbnb } from "react-icons/si";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { commonActions } from "store/common";
import styled, { css } from "styled-components";
import HeaderMenu from "./HeaderMenu";
import MiniSearchBar from "./miniSearchBar";
import SearchBar from "./searchBar";

interface ContainerProps {
  isTop: boolean;
  pathname: string;
  showMap: boolean;
}

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
  if (pathname === "/room/[id]" || pathname === "/reservations") {
    return css`
      position: relative;
      > div {
        max-width: ${({ theme }) => theme.maxWidth.normal};
      }
    `;
  }
  if (pathname === "/wishlists/[id]") {
    return css`
      > div {
        padding: ${({ theme }) => theme.padding.tablet};
      }
    `;
  }
  if (pathname === "/management") {
    return css`
      @media ${({ theme }) => theme.device.pcSmall} {
        > div {
          padding: 0px 24px;
        }
      }
    `;
  }
};

const Container = styled.div<ContainerProps>`
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
  .header_left-container {
    font-size: 24px;
    font-weight: 600;
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      margin-right: 6px;
    }
  }
  .header_right-container {
    color: black;
    position: relative;
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

const PCHeader = ({
  useSearchBar,
  scroll,
}: {
  useSearchBar: boolean;
  scroll: number;
}) => {
  const showMap = useSelector((state) => state.map.showMap);
  const showSearchBar = useSelector((state) => state.common.showSearchBar);
  const dispatch = useDispatch();

  const { pathname } = useRouter();

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
      <Container showMap={showMap} isTop={scroll === 0} pathname={pathname}>
        <div>
          <Link href="/">
            <div className="header_left-container">
              <SiAirbnb size={32} />
              airbnb
            </div>
          </Link>
          {useSearchBar && <MiniSearchBar scroll={scroll} />}
          <div className="header_right-container">
            <HeaderMenu />
          </div>
          {useSearchBar && <SearchBar scroll={scroll} />}
        </div>
      </Container>
      {useSearchBar && showSearchBar && pathname !== "/" && (
        <Background onClick={handleClick} />
      )}
    </>
  );
};

export default PCHeader;
