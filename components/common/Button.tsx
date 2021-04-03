import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";

interface ContainerProps {
  socialAuthButton: boolean;
  backgroundColor: "bittersweet" | "black" | "white" | "darkcyan" | undefined;
  useValidation: boolean;
  isValid: boolean;
}

const getBackgroundColor = (
  color: "bittersweet" | "black" | "white" | "darkcyan" | undefined
) => {
  switch (color) {
    case "bittersweet":
      return css`
        background-color: ${palette.bittersweet};
        color: white;
      `;
    case "black":
      return css`
        background-color: ${palette.black};
        color: white;
      `;
    case "white":
      return css`
        background-color: white;
        border: 1px solid ${palette.dark_cyan};
        color: black;
        &:hover {
          background-color: ${palette.gray_f7};
        }
      `;
    case "darkcyan":
      return css`
        background-color: ${palette.dark_cyan};
        color: white;
      `;
    default:
      return null;
  }
};

const Container = styled.button<ContainerProps>`
  width: 100%;
  border-radius: 8px;
  height: 48px;
  outline: none;
  border: 0;
  cursor: pointer;
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
  ${({ backgroundColor }) => getBackgroundColor(backgroundColor)}
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      cursor: not-allowed;
      background-color: ${palette.gray_dd};
    `}
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: Object;
  children: React.ReactNode;
  socialAuthButton?: boolean;
  backgroundColor?: "bittersweet" | "black" | "white" | "darkcyan";
  useValidation?: boolean;
  isValid?: boolean;
}

const Button = ({
  style,
  children,
  socialAuthButton = false,
  backgroundColor,
  useValidation = false,
  isValid = false,
  ...props
}: Props) => {
  return (
    <Container
      socialAuthButton={socialAuthButton}
      backgroundColor={backgroundColor}
      useValidation={useValidation}
      isValid={isValid}
      style={style}
      {...props}
    >
      {children}
    </Container>
  );
};

export default React.memo(Button);
