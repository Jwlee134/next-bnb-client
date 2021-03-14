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
    background-color: ${palette.dark_cyan};
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
}: {
  handleDelete: () => void;
  handleSave: () => void;
}) => {
  return (
    <Container>
      <Delete onClick={handleDelete}>지우기</Delete>
      <button onClick={handleSave}>저장</button>
    </Container>
  );
};

export default Footer;
