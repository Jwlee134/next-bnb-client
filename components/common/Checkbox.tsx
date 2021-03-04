import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
    width: 16px;
    height: 16px;
  }
`;

const Text = styled.span`
  margin-left: 16px;
`;

interface Props {
  options: string[];
  items: string[];
  onChange: (items: string[]) => void;
}

const Checkbox = ({ options, items, onChange }: Props) => {
  return (
    <Container>
      {options &&
        options.map((option, index) => (
          <InputContainer key={index}>
            <input
              type="checkbox"
              value={option}
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
              checked={items.includes(option)}
            />
            <Text>{option}</Text>
          </InputContainer>
        ))}
    </Container>
  );
};

export default Checkbox;
