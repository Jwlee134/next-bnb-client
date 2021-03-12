import Header from "components/header";
import { format } from "date-fns";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { IRoomDetail } from "types/room";
import { ImMap2 } from "react-icons/im";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import RoomList from "./RoomList";

const Container = styled.div`
  display: flex;
`;

const ListContainer = styled.div<{ showMap: boolean }>`
  width: 100vw;
  padding: 50px 80px;
  ${({ showMap }) =>
    showMap &&
    css`
      width: 55vw;
      padding: 50px 24px;
    `}
`;

const MapContainer = styled.div`
  width: 45vw;
  height: calc(100vh - 80px);
  background-color: burlywood;
  position: sticky;
  top: 80px;
`;

const Info = styled.div`
  font-weight: 300;
  font-size: 15px;
`;

const Title = styled.div`
  font-weight: 500;
  margin-top: 10px;
  font-size: 30px;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0px;
`;

const FilterContainer = styled.div`
  display: flex;
`;

const Filter = styled.div`
  padding: 10px 15px;
  border: 1px solid ${palette.gray_b0};
  border-radius: 32px;
  font-weight: 300;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_71};
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const ShowMap = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 15px;
  border-radius: 10px;
  svg {
    margin-right: 5px;
  }
  &:hover {
    background-color: ${palette.gray_f7};
  }
  cursor: pointer;
  font-weight: 300;
  font-size: 15px;
`;

const Alert = styled.div`
  font-weight: 300;
  font-size: 15px;
  padding-bottom: 15px;
`;

const SearchResults = ({ data }: { data: IRoomDetail[] }) => {
  const { showMap } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const { query } = useRouter();

  useEffect(() => {
    dispatch(commonActions.setShowMiniSearchBar(true));
    dispatch(commonActions.setShowSearchBar(false));
  }, []);

  const searchInfo = `${data.length}개의 숙소 
  ${
    query.checkIn &&
    query.checkOut &&
    `· ${format(new Date(query.checkIn as string), "MM월 dd일")} - ${format(
      new Date(query.checkOut as string),
      "MM월 dd일"
    )}`
  } · 게스트 ${Number(query.adults) + Number(query.children)}명`;

  return (
    <>
      <Head>
        <title>{query.value} · 숙소 · Airbnb</title>
      </Head>
      <Header />
      <Container>
        <ListContainer showMap={showMap}>
          <Info>{searchInfo}</Info>
          <Title>{query.value}</Title>
          <Options>
            <FilterContainer>
              <Filter>숙소 유형</Filter>
              <Filter>요금</Filter>
              <Filter>필터 추가하기</Filter>
            </FilterContainer>
            <ShowMap
              onClick={() => dispatch(commonActions.setShowMap(!showMap))}
            >
              <ImMap2 size={16} />
              {showMap ? "지도 숨기기" : "지도 표시하기"}
            </ShowMap>
          </Options>
          {!query.checkIn && !query.checkOut && (
            <Alert>
              여행 날짜를 입력하면 1박당 총 요금을 확인할 수 있습니다.
            </Alert>
          )}
          <RoomList data={data} />
        </ListContainer>
        {showMap && <MapContainer></MapContainer>}
      </Container>
    </>
  );
};

export default SearchResults;
