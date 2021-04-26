import Button from "components/common/Button";
import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { enterKey } from "utils";

interface ContainerProps {
  useOnlyButton: boolean;
}

const Container = styled.footer<ContainerProps>`
  width: 100%;
  height: 80px;
  border-top: 1px solid ${palette.gray_eb};
  padding: 0px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: fit-content;
    padding: 0px 24px;
  }
  ${({ useOnlyButton }) =>
    useOnlyButton &&
    css`
      button {
        width: 100%;
      }
    `}
  @media ${({ theme }) => theme.device.tabletSmall} {
    position: fixed;
    bottom: 0;
    background-color: white;
  }
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
    <Container useOnlyButton={useOnlyButton}>
      {!useOnlyButton && (
        <Abort
          tabIndex={0}
          aria-label="취소"
          role="button"
          onClick={onAbortClick}
          onKeyDown={(e) => {
            if (enterKey(e) && onAbortClick) onAbortClick();
          }}
        >
          {abortText}
        </Abort>
      )}
      <Button
        useValidation={useValidation}
        isValid={isValid}
        backgroundColor="black"
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </Container>
  );
};

export default ModalFooter;
