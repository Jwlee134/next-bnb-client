import Button from "components/common/Button";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { commonActions } from "store/common";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { makeQueryString } from "utils";

const Container = styled.div<{ searchMode: "location" | "date" | "guest" }>`
  width: 100%;
  height: 64px;
  background-color: white;
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
  z-index: 12;
  button {
    width: 90px;
    height: 40px;
    ${({ searchMode }) =>
      searchMode === "guest" &&
      css`
        background-color: ${palette.amaranth};
      `}
  }
`;

const Footer = ({
  setOpened,
}: {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const search = useSelector((state) => state.search);
  const searchMode = useSelector((state) => state.common.searchMode);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSkip = () => {
    dispatch(commonActions.setSearchMode("guest"));
  };

  const handleNext = () => {
    if (searchMode === "location") {
      dispatch(commonActions.setSearchMode("date"));
      return;
    }
    if (searchMode === "date") {
      handleSkip();
      return;
    }
    dispatch(commonActions.setIsLoading(true));
    router.push(
      `/search/rooms${makeQueryString({
        ...router.query,
        value: search.value,
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        latitude: search.latitude,
        longitude: search.longitude,
        adults: search.adults,
        children: String(search.children),
        infants: String(search.infants),
        id: "",
        zoom: "14",
        coordsBounds: "0.019114425627257958",
      })}`
    );
    setOpened(false);
    dispatch(commonActions.setSearchMode("location"));
  };

  return (
    <Container searchMode={searchMode}>
      {searchMode === "date" && (
        <Button backgroundColor="white" onClick={handleSkip}>
          건너뛰기
        </Button>
      )}
      <div />
      <Button
        useValidation={searchMode === "location"}
        isValid={!!search.latitude && !!search.longitude}
        backgroundColor="black"
        onClick={handleNext}
      >
        {searchMode === "guest" ? "검색" : "다음"}
      </Button>
    </Container>
  );
};

export default Footer;
