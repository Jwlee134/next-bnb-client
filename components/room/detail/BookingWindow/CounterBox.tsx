import Counter from "components/common/Counter";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import styled from "styled-components";
import querystring from "querystring";
import { searchActions } from "store/search";
import { deleteIdFromQuery } from "utils";

const Container = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15),
    0px 0px 0px 1px rgba(0, 0, 0, 0.07);
  padding: 0px 24px;
  z-index: 1;
  > div {
    margin: 24px 0px;
  }
  .counter-box_info-text {
    font-weight: 300;
    font-size: 15px;
  }
  .counter-box_close {
    text-align: right;
    cursor: pointer;
  }
`;

const CounterBox = ({
  setOpened,
}: {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const room = useSelector((state) => state.room.detail.room);
  const router = useRouter();
  const { query } = router;

  const dispatch = useDispatch();

  const handleAdult = (value: number) => {
    router.push(
      `/room/${room?._id}?${querystring.stringify(
        deleteIdFromQuery({
          ...query,
          adults: String(value),
        })
      )}`,
      undefined,
      { scroll: false }
    );
    dispatch(searchActions.setAdults(value));
  };

  const handleChildren = (value: number) => {
    router.push(
      `/room/${room?._id}?${querystring.stringify(
        deleteIdFromQuery({
          ...query,
          children: String(value),
        })
      )}`,
      undefined,
      { scroll: false }
    );
    dispatch(searchActions.setChildren(value));
  };

  const handleInfants = (value: number) => {
    router.push(
      `/room/${room?._id}?${querystring.stringify(
        deleteIdFromQuery({
          ...query,
          infants: String(value),
        })
      )}`,
      undefined,
      { scroll: false }
    );
    dispatch(searchActions.setInfants(value));
  };

  return (
    <Container>
      <Counter
        label="성인"
        onClick={handleAdult}
        value={Number(query.adults)}
        disabled={
          Number(query.adults) + Number(query.children) ===
          room?.maximumGuestCount
        }
      />
      <Counter
        label="어린이"
        subLabel="2~12세"
        onClick={handleChildren}
        value={Number(query.children)}
        disableValue={0}
        disabled={
          Number(query.adults) + Number(query.children) ===
          room?.maximumGuestCount
        }
      />
      <Counter
        label="유아"
        subLabel="2세 미만"
        onClick={handleInfants}
        value={Number(query.infants)}
        disableValue={0}
      />
      <div className="counter-box_info-text">
        최대 {room?.maximumGuestCount}명, 유아는 숙박 인원에 포함되지
        <br /> 않습니다.
      </div>
      <div className="counter-box_close" onClick={() => setOpened(false)}>
        닫기
      </div>
    </Container>
  );
};

export default CounterBox;
