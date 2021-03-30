import Button from "components/common/Button";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "store";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import differenceInDays from "date-fns/differenceInDays";
import { addComma } from "utils";
import {
  addDays,
  addMonths,
  addSeconds,
  eachDayOfInterval,
  format,
} from "date-fns";
import { IRoom } from "types/room";
import useSocket from "hooks/useSocket";
import useUser from "hooks/useUser";
import { makeReservationAPI } from "lib/api/reservation";
import { useRouter } from "next/router";
import CounterBox from "./CounterBox";
import DatePicker from "./DatePicker";
import Warning from "../../../../public/static/svg/warning.svg";

const Container = styled.div<{ notValid: boolean }>`
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
    margin-top: 24px;
    ${({ notValid }) =>
      notValid &&
      css`
        cursor: not-allowed;
      `}
  }
  .booking-window_price {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${palette.gray_dd};
    padding-bottom: 16px;
    margin-top: 16px;
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

const NotValid = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: ${palette.tawny};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  svg {
    margin-right: 5px;
  }
`;

const BookingWindow = () => {
  const search = useSelector((state) => state.search);
  const room = useSelector((state) => state.room.detail.room);

  const router = useRouter();
  const { user } = useUser();
  const socket = useSocket();

  const [opened, setOpened] = useState(false);
  const [notValidDates, setNotValidDates] = useState(false);
  const [notValidGuestCount, setNotValidGuestCount] = useState(false);

  const difference = () => {
    if (search.checkIn && search.checkOut) {
      return differenceInDays(
        new Date(search.checkOut),
        new Date(search.checkIn)
      );
    }
  };

  const handleClick = async () => {
    if (!search.checkIn) {
      document.getElementById("dateRangePicker-start")?.focus();
      return;
    }
    if (!search.checkOut) {
      document.getElementById("dateRangePicker-end")?.focus();
      return;
    }
    if (
      notValidDates ||
      notValidGuestCount ||
      !user?.isLoggedIn ||
      !socket ||
      !room
    ) {
      return;
    }
    const nights = difference();
    const body = {
      roomId: room._id as string,
      guestId: user._id as string,
      checkIn: search.checkIn,
      checkOut: addSeconds(new Date(), 5),
      guestCount: search.adults + search.children,
      price: room.price * (nights as number),
    };
    try {
      await makeReservationAPI(body);
      socket.emit("makeReservation", {
        hostId: room.creator._id,
        guestId: user._id,
      });
      router.push("/reservations");
    } catch (error) {
      alert(error.response.data);
    }
  };

  const dateValidation = () => {
    if (room && room.availability > 1) {
      const maxDate = addMonths(addDays(new Date(), 1), room.availability);
      const initializedMaxDate = new Date(maxDate.setHours(0, 0, 0, 0));
      if (
        new Date(search.checkIn as string) >= initializedMaxDate ||
        new Date(search.checkOut as string) >= initializedMaxDate
      ) {
        setNotValidDates(true);
        return;
      }
    }
    const bookingDays = eachDayOfInterval({
      start: new Date(search.checkIn as string),
      end: new Date(search.checkOut as string),
    }).map((day) => format(day, "MM월 dd일"));
    const blockedDays = (room as IRoom).blockedDayList.map((day) => {
      return format(new Date(day), "MM월 dd일");
    });
    const isIncluded = blockedDays.some((blocked) => {
      return bookingDays.includes(blocked);
    });
    if (isIncluded) {
      setNotValidDates(true);
    } else {
      setNotValidDates(false);
    }
  };

  useEffect(() => {
    if (!room) return;
    if (
      search.checkIn &&
      search.checkOut &&
      new Date(search.checkIn) < new Date(search.checkOut)
    ) {
      dateValidation();
    }
  }, [room, search.checkIn, search.checkOut]);

  useEffect(() => {
    if (!room) return;
    if (search.adults + search.children > room.maximumGuestCount) {
      setNotValidGuestCount(true);
    } else {
      setNotValidGuestCount(false);
    }
  }, [room, search.adults, search.children]);

  if (!room) return null;
  return (
    <Container notValid={notValidDates || notValidGuestCount}>
      <div className="booking-window_title">
        {!search.checkIn || !search.checkOut ? (
          <div>
            요금을 확인하려면 날짜를
            <br /> 입력하세요.
          </div>
        ) : (
          <div>
            {notValidDates || notValidGuestCount
              ? "유효하지 않은 조건입니다."
              : "예약 준비가 완료되었습니다!"}
          </div>
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
            게스트 {Number(search.adults) + Number(search.children)}명{" "}
            {Number(search.infants) > 0 && `, 유아 ${Number(search.infants)}명`}
          </div>
        </div>
        {opened && <CounterBox setOpened={setOpened} />}
      </OutsideClickHandler>
      {notValidDates && (
        <NotValid>
          <Warning />
          선택하신 날짜는 이용이 불가합니다.
        </NotValid>
      )}
      {notValidGuestCount && (
        <NotValid>
          <Warning />
          최대 인원 수는 {room.maximumGuestCount}명 입니다.
        </NotValid>
      )}
      <Button onClick={handleClick}>
        {!search.checkIn || !search.checkOut ? "예약 가능 여부 보기" : ""}
        {search.checkIn && search.checkOut && "예약하기"}
      </Button>
      {!notValidDates &&
        !notValidGuestCount &&
        search.checkIn &&
        search.checkOut && (
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
