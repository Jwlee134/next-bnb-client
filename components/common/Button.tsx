import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";

interface ContainerProps {
  socialAuthButton: boolean;
  whiteBackground: boolean;
}

const Container = styled.button<ContainerProps>`
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
  ${({ whiteBackground }) =>
    whiteBackground &&
    css`
      background-color: white;
      border: 1px solid ${palette.dark_cyan};
      color: black;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    `}
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: Object;
  children: React.ReactNode;
  socialAuthButton?: boolean;
  whiteBackground?: boolean;
}

const Button = ({
  style,
  children,
  socialAuthButton = false,
  whiteBackground = false,
  ...props
}: Props) => {
  return (
    <Container
      socialAuthButton={socialAuthButton}
      whiteBackground={whiteBackground}
      style={style}
      {...props}
    >
      {children}
    </Container>
  );
};

export default Button;
