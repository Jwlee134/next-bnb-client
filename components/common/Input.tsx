import React from "react";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div`
  width: 100%;
  input {
    all: unset;
    width: 100%;
    height: 56px;
    padding: 11px;
    border: 1px solid ${palette.gray_dd};
    box-sizing: border-box;
    border-radius: 8px;
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...props }: Props) => {
  return (
    <Container>
      <input {...props} />
    </Container>
  );
};

export default Input;
