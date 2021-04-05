import useLocation from "hooks/useLocation";
import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { commonActions } from "store/common";
import styled from "styled-components";

const Input = styled.input`
  all: unset;
  cursor: text;
  font-size: 14px;
  &::placeholder {
    font-size: 14px;
  }
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Location = () => {
  const showLocationPopup = useSelector(
    (state) => state.common.showLocationPopup
  );

  const dispatch = useDispatch();

  const { value, setValue, ListItem } = useLocation("pc");

  return (
    <div className="search-container">
      <OutsideClickHandler
        onOutsideClick={() => {
          dispatch(commonActions.setShowLocationPopup(false));
        }}
      >
        <label>
          <div
            className={`search-item ${
              showLocationPopup && "search-item-popup-opened"
            }`}
          >
            <h3 className="search-text">위치</h3>
            <Input
              onClick={() => dispatch(commonActions.setShowLocationPopup(true))}
              value={value}
              onChange={setValue}
              placeholder="어디로 여행가세요?"
            />
          </div>
        </label>
        {showLocationPopup && <ListItem />}
      </OutsideClickHandler>
    </div>
  );
};

export default Location;
