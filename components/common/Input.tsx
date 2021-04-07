import useValidation from "hooks/useValidation";
import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import Warning from "../../public/static/svg/warning.svg";

interface ContainerProps {
  isValid: boolean;
  validation: boolean;
  useValidationMode: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  input {
    all: unset;
    width: 100%;
    height: 48px;
    padding: 11px;
    border: 1px solid ${palette.gray_dd};
    box-sizing: border-box;
    border-radius: 8px;
    &:focus {
      border-color: ${palette.dark_cyan};
    }
    &::placeholder {
      font-weight: 300;
    }
    ${({ isValid, validation, useValidationMode }) =>
      !isValid &&
      validation &&
      useValidationMode &&
      css`
        background-color: ${palette.snow};
        border-color: ${palette.orange};
      `}
  }
  .input_error-message {
    margin-top: 8px;
    color: ${palette.tawny};
    font-weight: 300;
    font-size: 14px;
    display: flex;
    align-items: center;
    svg {
      margin-right: 5px;
      margin-bottom: 1px;
    }
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  useValidationMode?: boolean;
  showErrorMessage?: boolean;
}

const Input = ({
  isValid = true,
  useValidationMode = true,
  showErrorMessage = true,
  ...props
}: Props) => {
  const { validation } = useValidation();
  return (
    <Container
      isValid={isValid}
      validation={validation}
      useValidationMode={useValidationMode}
    >
      <input {...props} />
      {!isValid && useValidationMode && validation && showErrorMessage && (
        <div className="input_error-message">
          <Warning />
          필수 항목입니다.
        </div>
      )}
    </Container>
  );
};

export default Input;
