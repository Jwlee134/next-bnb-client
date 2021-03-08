import Button from "components/common/Button";
import Counter from "components/common/Counter";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { searchActions } from "store/search";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { BiSearch } from "react-icons/bi";

const Container = styled.div<{ popupOpened: boolean }>`
  > button {
    width: 48px;
    position: absolute;
    right: 8px;
    top: 8px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.1s linear;
    &:hover {
      background-color: #e44e53;
    }
    ${({ popupOpened }) =>
      popupOpened
        ? css`
            width: 84px;
            border-radius: 32px;
          `
        : css`
            transition: all 0.1s linear;
          `}
  }
`;

const Label = styled.label``;

const ListContainer = styled.ul`
  position: absolute;
  width: 320px;
  background-color: white;
  border-radius: 32px;
  top: 80px;
  right: 0;
  box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.15), 0px 3px 8px rgba(0, 0, 0, 0.1);
  padding: 18px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.gray_eb};
  margin: 18px 0px;
`;

const Text = styled.div`
  opacity: 0.7;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Guest = () => {
  const adults = useSelector((state) => state.search.adults);
  const children = useSelector((state) => state.search.children);
  const infants = useSelector((state) => state.search.infants);

  const dispatch = useDispatch();

  const [popupOpened, setPopupOpened] = useState(false);

  const handleAdults = (value: number) => {
    dispatch(searchActions.setAdults(value));
  };
  const handleChildren = (value: number) => {
    dispatch(searchActions.setChildren(value));
  };
  const handleInfants = (value: number) => {
    dispatch(searchActions.setInfants(value));
  };

  return (
    <Container className="search-container" popupOpened={popupOpened}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <Label onClick={() => setPopupOpened(!popupOpened)}>
          <div
            className={`search-item ${
              popupOpened && "search-item-popup-opened"
            }`}
          >
            <h3 className="search-text">인원</h3>
            <Text>
              {`성인 ${adults}명`}
              {children ? `, 어린이 ${children}명` : ""}
              {infants ? `, 유아 ${infants}명` : ""}
            </Text>
          </div>
        </Label>
        {popupOpened && (
          <ListContainer>
            <Counter
              label="성인"
              value={adults}
              onClick={handleAdults}
              subLabel="만 13세 이상"
            />
            <Divider />
            <Counter
              label="어린이"
              value={children}
              onClick={handleChildren}
              disableValue={0}
              subLabel="2~12세"
            />
            <Divider />
            <Counter
              label="유아"
              value={infants}
              onClick={handleInfants}
              disableValue={0}
              subLabel="2세 미만"
            />
          </ListContainer>
        )}
      </OutsideClickHandler>
      <Button>
        <BiSearch size={24} />
        {popupOpened && <span>검색</span>}
      </Button>
    </Container>
  );
};

export default Guest;
