import Button from "components/common/Button";
import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";

interface ContainerProps {
  useOnlyButton: boolean;
  useValidation: boolean;
  isValid: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 80px;
  border-top: 1px solid ${palette.gray_eb};
  padding: 0px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: fit-content;
    padding: 0px 16px;
    background-color: ${palette.black};
    color: white;
  }
  ${({ useOnlyButton }) =>
    useOnlyButton &&
    css`
      button {
        width: 100%;
      }
    `}
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      button {
        cursor: not-allowed;
        background-color: ${palette.gray_dd};
      }
    `}
`;

const Abort = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

interface Props {
  onButtonClick: () => void;
  onAbortClick?: () => void;
  useOnlyButton?: boolean;
  buttonText: string;
  abortText?: string;
  useValidation?: boolean;
  isValid?: boolean;
}

const ModalFooter = ({
  onButtonClick,
  onAbortClick,
  useOnlyButton = false,
  buttonText,
  abortText = "",
  useValidation = false,
  isValid = false,
}: Props) => {
  return (
    <Container
      useOnlyButton={useOnlyButton}
      useValidation={useValidation}
      isValid={isValid}
    >
      {!useOnlyButton && <Abort onClick={onAbortClick}>{abortText}</Abort>}
      <Button onClick={onButtonClick}>{buttonText}</Button>
    </Container>
  );
};

export default ModalFooter;
