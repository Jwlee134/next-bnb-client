import useValidation from "hooks/useValidation";
import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";

interface ContainerProps {
  isValid: boolean;
  validation: boolean;
  useValidationMode: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  span {
    display: block;
    margin-bottom: 8px;
  }
  select {
    font-size: 14px;
    width: 100%;
    border-radius: 8px;
    height: 48px;
    padding: 11px;
    border: 1px solid ${palette.gray_dd};
    outline: none;
    appearance: none;
    cursor: pointer;
    background-image: url("/static/svg/selector/down_arrow.svg");
    background-repeat: no-repeat;
    background-position: bottom 45% right 15px;
    &:focus {
      border-color: ${palette.dark_cyan};
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
`;

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  initialValue?: string;
  style?: Object;
  isValid?: boolean;
  useValidationMode?: boolean;
  label?: string;
}

const Selector = ({
  options,
  initialValue,
  style,
  isValid = true,
  useValidationMode = true,
  label,
  ...props
}: Props) => {
  const { validation } = useValidation();
  return (
    <Container
      style={style}
      isValid={isValid}
      validation={validation}
      useValidationMode={useValidationMode}
    >
      <label>
        {label && <span>{label}</span>}
        <select {...props}>
          {initialValue && <option disabled>{initialValue}</option>}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </Container>
  );
};

export default Selector;
