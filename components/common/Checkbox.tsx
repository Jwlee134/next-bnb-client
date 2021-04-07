import React from "react";
import styled from "styled-components";
import { isDetailOptions } from "types/typeguards";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .checkbox_input-container {
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
  }
  .checkbox_text-container {
    span {
      margin-left: 16px;
    }
    div {
      margin-left: 16px;
      font-weight: 300;
      font-size: 14px;
    }
  }
`;

export interface DetailOptions {
  label: string;
  value?: string;
  description: string;
}

interface Props {
  options: string[] | DetailOptions[];
  items: string[];
  onChange: (items: string[]) => void;
}

const Checkbox = ({ options, items, onChange }: Props) => {
  return (
    <Container>
      {options &&
        options.map((option: string | DetailOptions, index: number) => (
          <label className="checkbox_input-container" key={index}>
            <input
              type="checkbox"
              value={
                isDetailOptions(option) ? option.value || option.label : option
              }
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
                isDetailOptions(option) ? option.value || option.label : option
              )}
            />
            {!isDetailOptions(option) && <span>{option}</span>}
            {isDetailOptions(option) && option.label && (
              <div className="checkbox_text-container">
                <span>{option.label}</span>
                <div>{option.description}</div>
              </div>
            )}
          </label>
        ))}
    </Container>
  );
};

export default Checkbox;
