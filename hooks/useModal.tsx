import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import {
  fadeIn,
  fadeOut,
  hide,
  show,
  slideUp,
  slideDown,
} from "styles/animation";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  @media ${({ theme }) => theme.device.tabletSmall} {
    max-height: calc(100vh - 64px);
  }
`;

const Background = styled.div<{ modalOpened: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${({ modalOpened }) =>
    modalOpened
      ? css`
          animation: ${fadeIn} 0.25s linear forwards;
        `
      : css`
          animation: ${fadeOut} 0.25s linear;
        `}
`;

const Children = styled.div<{ modalOpened: boolean }>`
  z-index: 13;
  background-color: white;
  border-radius: 12px;
  ${({ modalOpened }) =>
    modalOpened
      ? css`
          animation: ${show} 0.25s ease-in-out forwards;
        `
      : css`
          animation: ${hide} 0.25s ease-in-out;
        `}
  @media ${({ theme }) => theme.device.tabletSmall} {
    width: 100vw;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    height: 100%;
    > div {
      width: 100%;
      max-height: 100%;
    }
    ${({ modalOpened }) =>
      modalOpened
        ? css`
            animation: ${slideUp} 0.4s ease-in-out forwards;
          `
        : css`
            animation: ${slideDown} 0.4s ease-in-out;
          `}
  }
`;

const useModal = () => {
  const dom = useRef<HTMLElement | null>();
  const [modalOpened, setModalOpened] = useState(false);
  const [animate, setAnimate] = useState(false);

  const openModal = () => {
    setAnimate(true);
    setModalOpened(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpened(false);
    setTimeout(() => {
      setAnimate(false);
    }, 250);
    document.body.style.overflow = "inherit";
  };

  useEffect(() => {
    if (document) {
      const element = document.getElementById("modal");
      dom.current = element;
    }
  }, []);

  const ModalPortal = ({ children }: { children: React.ReactNode }) => {
    if (!modalOpened && !animate) return null;
    if (dom.current) {
      return ReactDOM.createPortal(
        <Container>
          <Background modalOpened={modalOpened} onClick={closeModal} />
          <Children modalOpened={modalOpened}>{children}</Children>
        </Container>,
        dom.current
      );
    }
    return null;
  };

  return { openModal, closeModal, ModalPortal };
};

export default useModal;
