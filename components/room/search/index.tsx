import Header from "components/header";
import { format } from "date-fns";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { ImMap2 } from "react-icons/im";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import dynamic from "next/dynamic";
import querystring from "querystring";
import RoomList from "./RoomList";
import Filter from "./filter";

const Map = dynamic(() => import("../../common/Map"), { ssr: false });

const Container = styled.div`
  display: flex;
`;

const ListContainer = styled.div<{ showMap: boolean }>`
  width: 100vw;
  padding: 50px 80px;
  display: flex;
  flex-direction: column;
  ${({ showMap }) =>
    showMap
      ? css`
          width: 100%;
          max-width: 840px;
          padding: 50px 24px;
        `
      : css`
          max-width: 1760px;
          margin: 0 auto;
          min-height: calc(100vh - 80px);
        `}
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

const SearchResults = () => {
  const showMap = useSelector((state) => state.common.showMap);
  const searchResults = useSelector((state) => state.room.search.searchResults);
  const originalLength = useSelector(
    (state) => state.room.search.originalLength
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (Number(query.page) < 1) {
      router.push(
        `/search/rooms?${querystring.stringify({ ...query, page: "1" })}`
      );
    }
    if (Number(query.adults) < 1) {
      router.push(
        `/search/rooms?${querystring.stringify({ ...query, adults: "1" })}`
      );
    }
    if (Number(query.children) < 0) {
      router.push(
        `/search/rooms?${querystring.stringify({ ...query, children: "0" })}`
      );
    }
    if (Number(query.infants) < 0) {
      router.push(
        `/search/rooms?${querystring.stringify({ ...query, infants: "0" })}`
      );
    }
  }, []);

  const searchInfo = `${originalLength}개의 숙소 
  ${
    query.checkIn && query.checkOut
      ? `· ${format(new Date(query.checkIn as string), "MM월 dd일")} - ${format(
          new Date(query.checkOut as string),
          "MM월 dd일"
        )}`
      : ""
  } · 게스트 ${Number(query.adults) + Number(query.children)}명`;

  return (
    <>
      <Head>
        <title>{query.value} · 숙소 · Airbnb</title>
      </Head>
      <Header />
      <Container>
        <ListContainer showMap={showMap}>
          <div>
            <Info>{searchInfo}</Info>
            <Title>{query.value}</Title>
            <Options>
              <Filter />
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
          </div>
          <RoomList />
        </ListContainer>
        {showMap && <Map roomList={searchResults} useMoveToSearch />}
      </Container>
    </>
  );
};

export default SearchResults;
