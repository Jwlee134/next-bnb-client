import { format } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "store";
import styled from "styled-components";
import { ImMap2 } from "react-icons/im";
import palette from "styles/palette";
import { useDispatch } from "react-redux";
import { persistActions } from "store/persist";
import RoomList from "./RoomList";
import Filter from "./filter";

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.pc};
  display: flex;
  flex-direction: column;
  width: 100%;
  .search_info {
    font-weight: 300;
    font-size: 15px;
    margin-top: 50px;
  }
  .search_title {
    font-weight: 500;
    margin-top: 10px;
    font-size: 30px;
  }
  .search_options {
    display: flex;
    justify-content: space-between;
    padding: 16px 0px;
  }
  .search_show-map {
    display: flex;
    align-items: center;
    padding: 0px 16px;
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
  }
  .search_alert {
    font-weight: 300;
    font-size: 15px;
    padding-bottom: 15px;
  }
`;

const Contents = () => {
  const showMap = useSelector((state) => state.persist.showMap);
  const originalLength = useSelector(
    (state) => state.room.search.originalLength
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const searchInfo = `${originalLength}개의 숙소 
    ${
      query.checkIn && query.checkOut
        ? `· ${format(
            new Date(query.checkIn as string),
            "MM월 dd일"
          )} - ${format(new Date(query.checkOut as string), "MM월 dd일")}`
        : ""
    } · 게스트 ${Number(query.adults) + Number(query.children)}명`;

  return (
    <Container className="search_contents">
      <div>
        <div className="search_info">{searchInfo}</div>
        <div className="search_title">{query.value}</div>
        <div className="search_options">
          <Filter />
          <div
            className="search_show-map"
            onClick={() => dispatch(persistActions.setShowMap(!showMap))}
          >
            <ImMap2 size={16} />
            {showMap ? "지도 숨기기" : "지도 표시하기"}
          </div>
        </div>
        {!query.checkIn && !query.checkOut && (
          <div className="search_alert">
            여행 날짜를 입력하면 1박당 총 요금을 확인할 수 있습니다.
          </div>
        )}
      </div>
      <RoomList />
    </Container>
  );
};

export default Contents;
