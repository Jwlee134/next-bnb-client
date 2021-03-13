import { useRouter } from "next/router";
import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";

const Container = styled.div<{ pathname: string }>`
  display: flex;
  flex-direction: column;
  ${({ pathname }) =>
    pathname.includes("search") &&
    css`
      border-bottom: 1px solid ${palette.gray_eb};
      width: 100%;
      padding: 20px 20px 0px;
    `}
`;

const InputContainer = styled.label`
  margin-bottom: 16px;
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
  &:last-child {
    margin-bottom: 24px;
  }
  input {
    min-width: 16px;
    min-height: 16px;
  }
`;

const Text = styled.span`
  margin-left: 16px;
`;

const TextContainer = styled.div``;

const Description = styled.div`
  margin-left: 16px;
  font-weight: 300;
  font-size: 14px;
`;

interface DetailOptions {
  label: string;
  value: string;
  description: string;
}

interface Props {
  options: string[] | DetailOptions[];
  items: string[];
  onChange: (items: string[]) => void;
}

const Checkbox = ({ options, items, onChange }: Props) => {
  const { pathname } = useRouter();

  const isDetailOptions = (
    option: string | DetailOptions
  ): option is DetailOptions => {
    return (option as DetailOptions).label !== undefined;
  };

  return (
    <Container pathname={pathname}>
      {options &&
        options.map((option: string | DetailOptions, index: number) => (
          <InputContainer key={index}>
            <input
              type="checkbox"
              value={isDetailOptions(option) ? option.value : option}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...items, e.target.value]);
                } else {
                  const filtered = items?.filter(
                    (item) => item !== e.target.value
                  );
                  onChange(filtered);
                }
              }}
              checked={items.includes(
                isDetailOptions(option) ? option.value : option
              )}
            />
            {isDetailOptions(option) && !option.label && <Text>{option}</Text>}
            {isDetailOptions(option) && option.label && (
              <TextContainer>
                <Text>{option.label}</Text>
                <Description>{option.description}</Description>
              </TextContainer>
            )}
          </InputContainer>
        ))}
    </Container>
  );
};

export default Checkbox;
