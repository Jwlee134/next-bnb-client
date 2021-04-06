import React from "react";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { commonActions } from "store/common";
import styled from "styled-components";

const Container = styled.div`
  .search-popup_top-button {
    position: absolute;
    cursor: pointer;
    top: 27px;
    height: 25px;
  }
  .top-button_close {
    right: 24px;
  }
  .top-button_go-back {
    left: 24px;
  }
`;

const Header = ({
  setOpened,
}: {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const searchMode = useSelector((state) => state.common.searchMode);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpened(false);
    document.body.style.overflow = "inherit";
    dispatch(commonActions.setSearchMode("location"));
  };

  const handleGoBack = () => {
    if (searchMode === "date") {
      dispatch(commonActions.setSearchMode("location"));
      return;
    }
    if (searchMode === "guest") {
      dispatch(commonActions.setSearchMode("date"));
    }
  };

  return (
    <Container>
      <div
        className="search-popup_top-button top-button_close"
        onClick={handleClose}
      >
        <IoMdClose size={25} />
      </div>
      {searchMode !== "location" && (
        <div
          className="search-popup_top-button top-button_go-back"
          onClick={handleGoBack}
        >
          <IoIosArrowBack size={25} />
        </div>
      )}
    </Container>
  );
};

export default Header;
