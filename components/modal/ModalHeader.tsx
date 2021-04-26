import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import palette from "styles/palette";
import { enterKey } from "utils";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Container = styled.header`
  width: 100%;
  outline: none;
  position: relative;
  padding: 0px 24px;
  height: 64px;
  min-height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${palette.gray_eb};
  div {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    &:hover {
      background-color: ${palette.gray_f7};
    }
  }
`;

const ModalHeader = ({ children, onClick }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
    return () => {
      document.body.style.overflow = "inherit";
    };
  }, []);

  return (
    <Container tabIndex={0} ref={containerRef}>
      {children}
      <div
        role="button"
        aria-label="닫기"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (enterKey(e)) onClick();
        }}
      >
        <IoCloseSharp size={20} />
      </div>
    </Container>
  );
};

export default ModalHeader;
