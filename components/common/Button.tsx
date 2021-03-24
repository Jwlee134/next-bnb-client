import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";

const Container = styled.button<{ socialAuthButton: boolean }>`
  width: 100%;
  border-radius: 8px;
  height: 48px;
  outline: none;
  background-color: ${palette.bittersweet};
  border: 0;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: 600;
  position: relative;
  ${({ socialAuthButton }) =>
    socialAuthButton &&
    css`
      color: black;
      background-color: white;
      border: 2px solid ${palette.gray_c4};
      svg {
        position: absolute;
        left: 13px;
        top: 50%;
        transform: translateY(-50%);
      }
      &:hover {
        border-color: ${palette.gray_71};
      }
    `}
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: Object;
  children: React.ReactNode;
  socialAuthButton?: boolean;
}

const Button = ({
  style,
  children,
  socialAuthButton = false,
  ...props
}: Props) => {
  return (
    <Container socialAuthButton={socialAuthButton} style={style} {...props}>
      {children}
    </Container>
  );
};

export default Button;
