import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import styled from "styled-components";
import palette from "styles/palette";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Container = styled.div`
  width: 100%;
  height: 64px;
  padding: 0px 24px;
  border-bottom: 1px solid ${palette.gray_eb};
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    opacity: 0.7;
  }
`;

const MenuHeader = ({ children, onClick }: Props) => (
  <Container>
    {children}
    <div>
      <IoCloseSharp size={25} onClick={onClick} />
    </div>
  </Container>
);

export default MenuHeader;
