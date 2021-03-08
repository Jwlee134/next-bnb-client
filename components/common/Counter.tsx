import React from "react";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div`
  max-width: 320px;
`;

const Description = styled.div`
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CounterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
`;

const Label = styled.div`
  font-weight: 300;
`;

const Button = styled.button`
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
`;

const SubLabel = styled.div`
  font-size: 13px;
  font-weight: 300;
  opacity: 0.7;
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
}: Props) => {
  return (
    <>
      {description && <Description>{description}</Description>}
      <Container style={style}>
        <ButtonContainer>
          <div>
            <Label>{label}</Label>
            {subLabel && <SubLabel>{subLabel}</SubLabel>}
          </div>
          <CounterContainer>
            <Button
              disabled={value === disableValue}
              onClick={() => onClick(value - unitNum)}
            >
              –
            </Button>
            <span>{value}</span>
            <Button onClick={() => onClick(value + unitNum)}>+</Button>
          </CounterContainer>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default React.memo(Counter);
