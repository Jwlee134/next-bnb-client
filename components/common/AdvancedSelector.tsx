import useValidation from "hooks/useValidation";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled, { css } from "styled-components";
import palette from "styles/palette";

interface ContainerProps {
  isValid: boolean;
  validation: boolean;
  useValidationMode: boolean;
  listOpened: boolean;
}

const Title = styled.div`
  margin-bottom: 12px;
`;

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 56px;
  border: 1px solid ${palette.gray_b0};
  border-radius: 10px;
  cursor: pointer;
  padding-left: 12px;
  display: flex;
  align-items: center;
  background-image: url("/static/svg/selector/down_arrow.svg");
  background-repeat: no-repeat;
  background-position: bottom 45% right 15px;
  .advanced-selector_value {
    font-weight: 300;
  }
  ${({ listOpened }) =>
    listOpened &&
    css`
      border: 2px solid ${palette.dark_cyan};
    `}
  ${({ isValid, validation, useValidationMode }) =>
    !isValid &&
    validation &&
    useValidationMode &&
    css`
      background-color: ${palette.snow};
      border-color: ${palette.orange};
    `}
`;

const ListContainer = styled.div`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px,
    rgba(0, 0, 0, 0.07) 0px 0px 0px 1px;
  border-radius: 4px;
  padding: 16px;
  margin: 12px 0px;
`;

const Option = styled.div<{ selected: boolean }>`
  padding: 12px;
  background-color: white;
  cursor: pointer;
  .advanced-selector_list-container_description {
    font-weight: 300;
    font-size: 13px;
    opacity: 0.8;
  }
  &:hover {
    background-color: ${palette.gray_f7};
  }
  ${({ selected }) =>
    selected &&
    css`
      background-color: ${palette.gray_f7};
    `}
`;

const Subtitle = styled.div`
  font-size: 13px;
  opacity: 0.7;
  font-weight: 300;
  margin-top: 12px;
`;

interface Props {
  title: string;
  options: {
    label: string;
    description: string;
  }[];
  value: string | null;
  description: string | null;
  onClick: ({
    label,
    description,
  }: {
    label: string;
    description: string;
  }) => void;
  isValid?: boolean;
  useValidationMode?: boolean;
}

const AdvancedSelector = ({
  title,
  options,
  value,
  description,
  onClick,
  isValid = true,
  useValidationMode = true,
}: Props) => {
  const [listOpened, setListOpened] = useState(false);
  const { validation } = useValidation();

  return (
    <>
      <Title>{title}</Title>
      <OutsideClickHandler onOutsideClick={() => setListOpened(false)}>
        <Container
          isValid={isValid}
          validation={validation}
          useValidationMode={useValidationMode}
          listOpened={listOpened}
          onClick={() => setListOpened(!listOpened)}
        >
          <div className="advanced-selector_value">
            {value || "하나를 선택해주세요."}
          </div>
        </Container>
        {listOpened && (
          <ListContainer>
            {options.map(({ label, description }, index) => (
              <Option
                key={index}
                onClick={() => {
                  onClick({ label, description });
                  setListOpened(false);
                }}
                selected={value === label}
              >
                {label}
                <div className="advanced-selector_list-container_description">
                  {description}
                </div>
              </Option>
            ))}
          </ListContainer>
        )}
        {value && description && !listOpened && (
          <Subtitle>
            {value} : {description}
          </Subtitle>
        )}
      </OutsideClickHandler>
    </>
  );
};

export default AdvancedSelector;
