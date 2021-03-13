import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import palette from "styles/palette";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useSelector } from "store";
import querystring from "querystring";
import RoomCardSkeleton from "components/common/RoomCardSkeleton";
import { useDispatch } from "react-redux";
import { roomActions } from "store/room";
import RoomCard from "./RoomCard";

const Container = styled.div`
  .paginate-container {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
  .paginate-number,
  .break,
  .previous,
  .next {
    margin: 0px 5px;
    border-radius: 50%;
  }
  .paginate-number:hover:not(.paginate-actived),
  .break:hover,
  .previous:hover:not(.disabled),
  .next:hover:not(.disabled) {
    background-color: ${palette.gray_f7};
  }
  .paginate-number a,
  .previous a,
  .next a,
  .break a {
    outline: none;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .paginate-actived {
    background-color: ${palette.black};
    border-radius: 50%;
    a {
      color: white;
    }
  }
  .disabled a {
    cursor: not-allowed !important;
    opacity: 0.5;
  }
`;

const Info = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 300;
  margin-top: 10px;
  font-size: 14px;
`;

const Empty = styled.div`
  width: 70%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
`;

const RoomList = () => {
  const searchResults = useSelector((state) => state.room.search.searchResults);
  const originalLength = useSelector(
    (state) => state.room.search.originalLength
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { page = "1", limit = "10" } = router.query;

  const handleChange = ({ selected }: { selected: number }) => {
    setLoading(true);
    dispatch(roomActions.setSearchResults({ data: [], originalLength }));
    window.scrollTo(0, 0);
    if (router.query.page) delete router.query.page;
    router.push(
      `${router.pathname}?${querystring.stringify(router.query)}&page=${
        selected + 1
      }`
    );
  };

  useEffect(() => {
    if (!isEmpty(searchResults) && loading) setLoading(false);
  }, [searchResults]);

  const info = useMemo(() => {
    if (
      (Number(page) - 1) * Number(limit) + 1 ===
      (Number(page) - 1) * Number(limit) + searchResults.length
    ) {
      return `${originalLength}개의 숙소 중 ${
        (Number(page) - 1) * Number(limit) + 1
      }`;
    }
    return `${originalLength}개의 숙소 중 ${
      (Number(page) - 1) * Number(limit) + 1
    } -
          ${(Number(page) - 1) * Number(limit) + searchResults.length}`;
  }, [page, searchResults]);

  if (isEmpty(searchResults) && !loading) {
    return (
      <Empty>
        이 지역에는 숙소가 존재하지 않거나 설정하신 조건을 만족하는 숙소가
        없어요.
      </Empty>
    );
  }

  return (
    <Container>
      {searchResults.map((room, index) => (
        <RoomCard key={index} room={room} />
      ))}
      {loading && (
        <>
          <RoomCardSkeleton />
          <RoomCardSkeleton />
          <RoomCardSkeleton />
          <RoomCardSkeleton />
          <RoomCardSkeleton />
        </>
      )}
      {!isEmpty(searchResults) && (
        <>
          <ReactPaginate
            pageCount={Math.ceil(originalLength / Number(limit))}
            pageRangeDisplayed={3}
            marginPagesDisplayed={5}
            previousLabel="<"
            nextLabel=">"
            breakLabel="···"
            containerClassName="paginate-container"
            pageClassName="paginate-number"
            activeClassName="paginate-actived"
            onPageChange={handleChange}
            disabledClassName="disabled"
            forcePage={Number(page) - 1}
          />
          <Info>{info}</Info>
        </>
      )}
    </Container>
  );
};

export default RoomList;
