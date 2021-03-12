import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { IRoomDetail } from "types/room";
import ReactPaginate from "react-paginate";
import palette from "styles/palette";
import { isEmpty } from "lodash";
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

const limit = 5;

const RoomList = ({ data }: { data: IRoomDetail[] }) => {
  const [page, setPage] = useState(1);

  const slicedData = data.slice((page - 1) * limit, page * limit);

  const handleChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
    window.scrollTo(0, 0);
  };

  const info = useMemo(() => {
    if ((page - 1) * limit + 1 === (page - 1) * limit + slicedData.length) {
      return `${data.length}개의 숙소 중 ${(page - 1) * limit + 1}`;
    }
    return `${data.length}개의 숙소 중 ${(page - 1) * limit + 1} -
          ${(page - 1) * limit + slicedData.length}`;
  }, [page, slicedData]);

  return (
    <Container>
      {slicedData.map((room, index) => (
        <RoomCard key={index} room={room} />
      ))}
      {!isEmpty(slicedData) && (
        <>
          <ReactPaginate
            pageCount={Math.ceil(data.length / limit)}
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
          />
          <Info>{info}</Info>
        </>
      )}
    </Container>
  );
};

export default RoomList;
