import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";

const Label = styled.label``;

const ListContainer = styled.ul``;

const CheckIn = () => {
  const [popupOpened, setPopupOpened] = useState(false);
  return (
    <div className="search-container search-date">
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <Label onClick={() => setPopupOpened(true)}>
          <div
            className={`search-item ${
              popupOpened && "search-item-popup-opened"
            }`}
          >
            <h3 className="search-text">체크인</h3>
          </div>
        </Label>
        {popupOpened && <ListContainer></ListContainer>}
      </OutsideClickHandler>
    </div>
  );
};

export default CheckIn;
