import useValidation from "hooks/useValidation";
import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import styled, { css } from "styled-components";
import palette from "styles/palette";

interface TextareaProps {
  isValid: boolean;
  validation: boolean;
}

const Container = styled.div<TextareaProps>`
  margin-bottom: 24px;
  .textarea_text {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .textarea_length {
    width: fit-content;
    font-size: 14px;
  }
  ${({ isValid, validation }) =>
    !isValid &&
    validation &&
    css`
      textarea {
        border-color: ${palette.tawny};
        background-color: ${palette.snow};
      }
    `}
`;

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  min-height: 200px;
  border-radius: 5px;
  outline: none;
  resize: none;
  padding: 11px;
  border: 1px solid ${palette.gray_eb};
  transition: border-color 0.1s linear;
  &::placeholder {
    color: ${palette.gray_76};
  }
  &:focus {
    border-color: ${palette.dark_cyan};
  }
`;

interface Props {
  isValid?: boolean;
  maxLength?: number;
  onChange: (value: string) => void;
  value: string;
}

const Textarea = ({ isValid = true, maxLength, onChange, value }: Props) => {
  const { validation } = useValidation();

  return (
    <Container isValid={isValid} validation={validation}>
      <StyledTextarea
        maxLength={maxLength}
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
      />
      {maxLength && (
        <div className="textarea_text">
          <span />
          <span className="textarea_length">{maxLength - value.length}</span>
        </div>
      )}
    </Container>
  );
};

export default Textarea;
