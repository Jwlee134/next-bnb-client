import React from "react";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border-top: 1px solid ${palette.gray_eb};
  button {
    color: white;
    background-color: ${palette.black};
    outline: none;
    border: none;
    padding: 5px 15px;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const Delete = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const Footer = ({
  handleDelete,
  handleSave,
  children,
}: {
  handleDelete: () => void;
  handleSave: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Container>
      <Delete onClick={handleDelete}>지우기</Delete>
      <button onClick={handleSave}>{children}</button>
    </Container>
  );
};

export default Footer;
