import React from "react";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import palette from "styles/palette";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Container = styled.header`
  width: 100%;
  position: relative;
  padding: 0px 24px;
  height: 64px;
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
  return (
    <Container>
      {children}
      <div>
        <IoCloseSharp size={20} onClick={onClick} />
      </div>
    </Container>
  );
};

export default ModalHeader;
