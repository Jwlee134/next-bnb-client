import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { fadeIn, fadeOut, slideToLeft, slideToRight } from "styles/animation";

const Container = styled.div<{ menuOpened: boolean }>`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  .hamburger-portal_background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${({ menuOpened }) =>
      menuOpened
        ? css`
            animation: ${fadeIn} 0.5s linear forwards;
          `
        : css`
            animation: ${fadeOut} 0.5s linear;
          `}
  }
  .hamburger-portal_children {
    z-index: 11;
    height: 100%;
    background-color: white;
    ${({ menuOpened }) =>
      menuOpened
        ? css`
            animation: ${slideToLeft} 0.5s ease-out forwards;
          `
        : css`
            animation: ${slideToRight} 0.5s ease-in;
          `};
  }
`;

const useHamburgetMenu = () => {
  const dom = useRef<HTMLElement | null>();
  const [menuOpened, setMenuOpened] = useState(false);
  const [animate, setAnimate] = useState(false);

  const openMenu = () => {
    setMenuOpened(true);
    setAnimate(true);
  };

  const closeMenu = () => {
    setMenuOpened(false);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  };

  useEffect(() => {
    if (document) {
      const element = document.getElementById("portal");
      dom.current = element;
    }
  }, []);

  const HamburgerPortal = ({ children }: { children: React.ReactNode }) => {
    if (!menuOpened && !animate) return null;
    if (dom.current) {
      return ReactDOM.createPortal(
        <Container menuOpened={menuOpened}>
          <div className="hamburger-portal_background" onClick={closeMenu} />
          <div className="hamburger-portal_children">{children}</div>
        </Container>,
        dom.current
      );
    }
    return null;
  };

  return { openMenu, closeMenu, HamburgerPortal };
};

export default useHamburgetMenu;
