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
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
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

const Footer = () => {
  const search = useSelector((state) => state.search);
  const searchMode = useSelector((state) => state.common.searchMode);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSkip = () => {
    dispatch(commonActions.setSearchMode("guest"));
  };

  const handleNext = () => {
    if (searchMode === "date") {
      handleSkip();
      return;
    }
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
  };

  return (
    <Container searchMode={searchMode}>
      {searchMode === "date" && (
        <Button backgroundColor="white" onClick={handleSkip}>
          건너뛰기
        </Button>
      )}
      {searchMode !== "location" && (
        <>
          <div />
          <Button backgroundColor="black" onClick={handleNext}>
            {searchMode === "date" ? "다음" : "검색"}
          </Button>
        </>
      )}
    </Container>
  );
};

export default Footer;
