import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { SiAirbnb } from "react-icons/si";
import SearchBar from "components/header/searchBar";
import { throttle } from "lodash";
import HeaderMenu from "./HeaderMenu";
import MiniSearchBar from "./miniSearchBar";

interface ContainerProps {
  isTop: boolean;
  isHome: boolean;
}

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
  transition: all 0.15s linear;
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

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: 80px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const Header = () => {
  const { pathname } = useRouter();

  const headerRef = useRef<HTMLElement>(null);

  const [scroll, setScroll] = useState(0);
  const [hideMiniBar, setHideMiniBar] = useState(pathname === "/" && true);
  const [showBar, setShowBar] = useState(pathname === "/" && true);
  const [sizeDownAnimate, setSizeDownAnimate] = useState(false);

  const handleScroll = throttle(() => {
    setScroll(window.scrollY);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    setSizeDownAnimate(true);
    setHideMiniBar(false);
    setShowBar(false);
    setTimeout(() => {
      setSizeDownAnimate(false);
    }, 80);
  };

  return (
    <>
      <Container ref={headerRef} isTop={scroll === 0} isHome={pathname === "/"}>
        <Link href="/">
          <LeftContainer>
            <SiAirbnb size={32} />
            airbnb
          </LeftContainer>
        </Link>
        <MiniSearchBar
          scroll={scroll}
          isHome={pathname === "/"}
          hideMiniBar={hideMiniBar}
          setHideMiniBar={setHideMiniBar}
          setShowBar={setShowBar}
          sizeDownAnimate={sizeDownAnimate}
          setSizeDownAnimate={setSizeDownAnimate}
        />
        <RightContainer>
          <HeaderMenu />
        </RightContainer>
        <SearchBar
          scroll={scroll}
          isHome={pathname === "/"}
          showBar={showBar}
          setShowBar={setShowBar}
        />
      </Container>
      {showBar && pathname !== "/" && <Background onClick={handleClick} />}
    </>
  );
};

export default Header;
