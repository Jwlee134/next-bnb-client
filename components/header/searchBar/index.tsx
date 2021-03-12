import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { commonActions } from "store/common";
import { searchActions } from "store/search";
import styled from "styled-components";
import palette from "styles/palette";
import Date from "./Date";
import Guest from "./Guest";
import Location from "./Location";
import SearchButton from "./SearchButton";

const SearchBarContainer = styled.div`
  position: absolute;
  top: 100px;
  width: 100%;
  padding: 0px 30px;
  left: 50%;
  transform: translate(-50%);
`;

const Container = styled.div`
  width: 100%;
  max-width: 850px;
  height: 64px;
  color: black;
  background-color: white;
  box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.15), 0px 3px 8px rgba(0, 0, 0, 0.1);
  border-radius: 32px;
  margin: 0 auto;
  display: flex;
  position: relative;
  .search-container {
    position: relative;
    flex-grow: 1.5;
    height: 100%;
  }
  .search-date {
    flex-grow: 1.5;
  }
  .search-guest {
    flex-grow: 1;
  }
  .search-item {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 20px;
    border-radius: 32px;
    &:hover {
      background-color: ${palette.gray_eb};
    }
    cursor: pointer;
  }
  .search-text {
    font-size: 14px;
  }
  .search-item-popup-opened {
    box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.15),
      0px 3px 8px rgba(0, 0, 0, 0.1);
    &:hover {
      background-color: white !important;
    }
  }
`;

const Divider = styled.div`
  width: 1px;
  background-color: ${palette.gray_eb};
  height: 28px;
  margin: auto 0;
`;

const SearchBar = ({ scroll }: { scroll: number }) => {
  const showSearchBar = useSelector((state) => state.common.showSearchBar);
  const value = useSelector((state) => state.search.value);

  const dispatch = useDispatch();

  const [locationPopup, setLocationPopup] = useState(false);

  const {
    pathname,
    query: {
      value: keyword,
      latitude,
      longitude,
      checkIn,
      checkOut,
      adults,
      children,
      infants,
    },
  } = useRouter();

  useEffect(() => {
    // 스크롤이 움직일 때 큰 검색바가 보여지고 있다면 큰 검색바 숨김
    if (scroll && showSearchBar) {
      dispatch(commonActions.setShowSearchBar(false));
    }
    if (pathname === "/") {
      // 홈 화면 스크롤 이벤트
      if (!scroll && !showSearchBar) {
        // 스크롤이 0이 되면 미니바 사이즈업 애니메이션 기다린 후 보여줌
        setTimeout(() => {
          dispatch(commonActions.setShowSearchBar(true));
        }, 80);
      }
    }
  }, [scroll]);

  // 새로고침 등의 이슈로 인해 데이터가 소실되면 다시 스토어에 넣어줌
  useEffect(() => {
    if (!value && pathname !== "/") {
      dispatch(searchActions.setValue(keyword as string));
      dispatch(searchActions.setLatitude(Number(latitude as string)));
      dispatch(searchActions.setLongitude(Number(longitude as string)));
      dispatch(searchActions.setCheckIn(checkIn as string));
      dispatch(searchActions.setCheckOut(checkOut as string));
      dispatch(searchActions.setAdults(Number(adults as string)));
      dispatch(searchActions.setChildren(Number(children as string)));
      dispatch(searchActions.setInfants(Number(infants as string)));
    }
  }, [
    keyword,
    latitude,
    longitude,
    checkIn,
    checkOut,
    adults,
    children,
    infants,
  ]);

  if (!showSearchBar) return null;
  return (
    <SearchBarContainer>
      <Container>
        <Location
          locationPopup={locationPopup}
          setLocationPopup={setLocationPopup}
        />
        <Divider />
        <Date />
        <Divider />
        <Guest />
        <SearchButton setLocationPopup={setLocationPopup} />
      </Container>
    </SearchBarContainer>
  );
};

export default SearchBar;
