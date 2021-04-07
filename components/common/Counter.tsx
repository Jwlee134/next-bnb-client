import React from "react";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div`
  max-width: 320px;
  .counter_description {
    margin-bottom: 8px;
  }
  .counter_button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .counter_counter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;
  }
  .counter_button-container_label {
    font-weight: 300;
  }
  .counter_button {
    border-radius: 50%;
    background-color: white;
    border: 1px solid ${palette.dark_cyan};
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    outline: none;
    &:disabled {
      border-color: ${palette.gray_c4};
      cursor: not-allowed;
    }
    &:active {
      border-color: ${palette.gray_c4};
    }
  }
  .counter_button-container_sublabel {
    font-size: 13px;
    font-weight: 300;
    opacity: 0.7;
  }
`;

interface Props {
  description?: string;
  label: string;
  value: number;
  unitNum?: number;
  onClick: (value: number) => void;
  style?: Object;
  disableValue?: number;
  subLabel?: string;
  disabled?: boolean;
}

const Counter = ({
  description,
  label,
  value,
  unitNum = 1,
  onClick,
  style,
  disableValue = 1,
  subLabel,
  disabled = false,
}: Props) => {
  return (
    <>
      {description && <div className="counter_description">{description}</div>}
      <Container style={style}>
        <div className="counter_button-container">
          <div>
            <div className="counter_button-container_label">{label}</div>
            {subLabel && (
              <div className="counter_button-container_sublabel">
                {subLabel}
              </div>
            )}
          </div>
          <div className="counter_counter-container">
            <button
              className="counter_button"
              disabled={value === disableValue}
              onClick={() => onClick(value - unitNum)}
            >
              –
            </button>
            <span>{value}</span>
            <button
              className="counter_button"
              disabled={disabled}
              onClick={() => onClick(value + unitNum)}
            >
              +
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Counter;
