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

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Length = styled.span`
  width: fit-content;
  font-size: 14px;
`;

interface Props {
  isValid?: boolean;
  maxLength: number;
  onChange: (value: string) => void;
  value: string;
}

const Textarea = ({ isValid = true, maxLength, onChange, value }: Props) => {
  const { validation } = useValidation();

  const calculateLength = maxLength - value.length;

  return (
    <Container isValid={isValid} validation={validation}>
      <StyledTextarea
        maxLength={maxLength}
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
      />
      <Text>
        <span />
        <Length>{calculateLength}</Length>
      </Text>
    </Container>
  );
};

export default Textarea;
