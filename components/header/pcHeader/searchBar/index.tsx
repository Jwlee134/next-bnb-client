import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { commonActions } from "store/common";
import styled from "styled-components";
import palette from "styles/palette";
import Date from "./Date";
import Guest from "./Guest";
import Location from "./Location";
import SearchButton from "./SearchButton";

const SearchBarContainer = styled.div`
  position: absolute;
  top: 100px;
  padding: 0px 30px;
  max-width: 850px;
  width: 100%;
  left: 50%;
  transform: translate(-50%);
`;

const Container = styled.div`
  width: 100%;
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

  const dispatch = useDispatch();

  const { pathname } = useRouter();

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
        }, 100);
      }
    }
  }, [scroll, dispatch, pathname]);

  if (!showSearchBar) return null;
  return (
    <SearchBarContainer>
      <Container>
        <Location />
        <Divider />
        <Date />
        <Divider />
        <Guest />
        <SearchButton />
      </Container>
    </SearchBarContainer>
  );
};

export default SearchBar;
