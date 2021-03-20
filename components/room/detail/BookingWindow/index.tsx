import Button from "components/common/Button";
import { useRouter } from "next/router";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "store";
import styled from "styled-components";
import palette from "styles/palette";
import differenceInDays from "date-fns/differenceInDays";
import { addComma } from "utils";
import CounterBox from "./CounterBox";
import DatePicker from "./DatePicker";

const Container = styled.div`
  width: 100%;
  background-color: white;
  padding: 24px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
  position: sticky;
  top: 40px;
  border-radius: 12px;
  border: 1px solid ${palette.gray_dd};
  > div:nth-child(3) {
    position: relative;
  }
  .booking-window_title {
    font-size: 22px;
    font-weight: bold;
  }
  .booking-window_guest {
    border: 1px solid ${palette.gray_c4};
    height: 56px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border-top: 0;
    cursor: pointer;
    position: relative;
    > div:first-child {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 12px;
    }
    > div:last-child {
      padding: 30px 0px 0px 10px;
      font-size: 14.5px;
    }
  }
  > button {
    background-color: ${palette.amaranth};
    border-radius: 12px;
    margin: 24px 0px;
  }
  .booking-window_price {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${palette.gray_dd};
    padding-bottom: 16px;
    > div {
      display: flex;
      align-items: center;
      &:first-child {
        text-decoration: underline;
      }
    }
  }
  .booking-window_total-price {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    > div {
      font-weight: 600;
    }
  }
`;

const BookingWindow = () => {
  const search = useSelector((state) => state.search);
  const room = useSelector((state) => state.room.detail.room);
  const router = useRouter();
  const { query } = router;

  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    if (!search.checkIn) {
      document.getElementById("dateRangePicker-start")?.focus();
      return;
    }
    if (!search.checkOut) {
      document.getElementById("dateRangePicker-end")?.focus();
      return;
    }
  };

  const difference = () => {
    if (search.checkIn && search.checkOut) {
      return differenceInDays(
        new Date(search.checkOut),
        new Date(search.checkIn)
      );
    }
  };

  if (!room) return null;
  return (
    <Container>
      <div className="booking-window_title">
        {!query.checkIn || !query.checkOut ? (
          <div>
            요금을 확인하려면 날짜를
            <br /> 입력하세요.
          </div>
        ) : (
          <div>예약 준비가 완료되었습니다!</div>
        )}
      </div>
      <DatePicker />
      <OutsideClickHandler onOutsideClick={() => setOpened(false)}>
        <div
          className="booking-window_guest"
          onClick={() => setOpened(!opened)}
        >
          <div>인원</div>
          <div>
            게스트 {Number(query.adults) + Number(query.children)}명{" "}
            {Number(query.infants) > 0 && `, 유아 ${Number(query.infants)}명`}
          </div>
        </div>
        {opened && <CounterBox setOpened={setOpened} />}
      </OutsideClickHandler>
      <Button onClick={handleClick}>
        {!search.checkIn || !search.checkOut ? "예약 가능 여부 보기" : ""}
        {search.checkIn && search.checkOut && "예약하기"}
      </Button>
      {search.checkIn && search.checkOut && (
        <>
          <div className="booking-window_price">
            <div>
              ￦{addComma(String(room.price))} x {difference()}박
            </div>
            <div>
              ￦{addComma(String(room.price * (difference() as number)))}
            </div>
          </div>
          <div className="booking-window_total-price">
            <div>총 합계</div>
            <div>
              ￦{addComma(String(room.price * (difference() as number)))}
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default BookingWindow;
