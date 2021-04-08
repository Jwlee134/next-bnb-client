import useValidation from "hooks/useValidation";
import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import Warning from "../../public/static/svg/warning.svg";

interface BlockProps {
  isValid: boolean;
  validation: boolean;
  useValidationMode: boolean;
  checked: boolean;
}

const Container = styled.div`
  max-width: 485px;
  .radio-input_title {
    margin-bottom: 32px;
  }
  .radio-input-container {
    display: block;
    margin-bottom: 24px;
    cursor: pointer;
  }
  .radio-input_label {
    font-weight: 300;
    margin-bottom: 5px;
  }
  .radio-input_description {
    font-weight: 300;
    font-size: 14px;
    margin-left: 30px;
    opacity: 0.7;
  }
  .radio-input_error-message {
    margin-top: 8px;
    color: ${palette.tawny};
    font-weight: 300;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    svg {
      margin-right: 5px;
      margin-bottom: 1px;
    }
  }
`;

const Block = styled.div<BlockProps>`
  display: flex;
  align-items: center;
  input {
    all: unset;
    margin-right: 12px;
    margin-bottom: 6px;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid ${palette.gray_b0};
    cursor: pointer;
    outline: none;
    position: relative;
    ${({ checked }) =>
      checked &&
      css`
        background-color: ${palette.dark_cyan};
        &::after {
          position: absolute;
          content: "";
          width: 6.5px;
          height: 6.5px;
          background-color: white;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}
    ${({ isValid, validation, useValidationMode }) =>
      !isValid &&
      validation &&
      useValidationMode &&
      css`
        background-color: ${palette.snow};
        border-color: ${palette.orange};
      `}
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  options: {
    label: string;
    value: string | number;
    description?: string;
  }[];
  currentValue: string | number | null;
  isValid?: boolean;
  useValidationMode?: boolean;
}

const RadioInput = ({
  title,
  options,
  currentValue,
  isValid = true,
  useValidationMode = true,
  ...props
}: Props) => {
  const { validation } = useValidation();
  return (
    <>
      <Container>
        {title && <div className="radio-input_title">{title}</div>}
        {options.map((option, index) => (
          <label className="radio-input-container" key={index}>
            <Block
              isValid={isValid}
              validation={validation}
              useValidationMode={useValidationMode}
              checked={currentValue === option.value}
            >
              <input
                type="radio"
                value={option.value}
                checked={currentValue === option.value}
                {...props}
              />
              <div className="radio-input_label">{option.label}</div>
            </Block>
            {option.description && (
              <div className="radio-input_description">
                {option.description}
              </div>
            )}
          </label>
        ))}
        {!isValid && useValidationMode && validation && (
          <div className="radio-input_error-message">
            <Warning />
            필수 항목입니다.
          </div>
        )}
      </Container>
    </>
  );
};

export default RadioInput;
