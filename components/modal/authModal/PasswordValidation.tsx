import React from "react";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div<{ isValid: boolean }>`
  margin-top: 8px;
  color: ${({ isValid }) => (isValid ? palette.green : palette.tawny)};
  font-weight: 300;
  font-size: 14px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
    margin-bottom: 1px;
  }
`;

const PasswordValidation = ({
  children,
  isValid,
}: {
  children: React.ReactNode;
  isValid: boolean;
}) => {
  return <Container isValid={isValid}>{children}</Container>;
};

export default PasswordValidation;
