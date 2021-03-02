import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { throttle } from "lodash";
import { SiAirbnb } from "react-icons/si";
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
  transition: all 0.3s linear;
  ${({ isTop }) =>
    !isTop &&
    css`
      background-color: white;
      box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.08);
      color: #ff395b;
    `}
  ${({ isHome }) =>
    !isHome &&
    css`
      color: #ff395b;
      box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.08);
      background-color: white;
    `}
`;

const Header = () => {
  const [isTop, setIsTop] = useState(true);
  const { pathname } = useRouter();

  const handleScroll = throttle(() => {
    if (window.scrollY > 10) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  }, 50);

  useEffect(() => {
    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <Container isTop={isTop} isHome={pathname === "/"}>
      <Link href="/">
        <LeftContainer>
          <SiAirbnb size={32} />
          airbnb
        </LeftContainer>
      </Link>
      <RightContainer>
        <HeaderMenu />
      </RightContainer>
    </Container>
  );
};

export default Header;
