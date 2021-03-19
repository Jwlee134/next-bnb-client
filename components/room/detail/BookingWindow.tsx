import DateRangePicker from "components/common/DateRangePicker";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { toMomentObject } from "react-dates";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { searchActions } from "store/search";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div`
  width: 100%;
  background-color: white;
  padding: 24px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
  position: sticky;
  top: 40px;
  border-radius: 12px;
  border: 1px solid ${palette.gray_dd};
  .booking-window_title {
    font-size: 22px;
    font-weight: bold;
  }
  .booking-window_date-picker {
    position: relative;
    margin-top: 24px;
    border: 1px solid ${palette.gray_c4};
    height: 56px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    .DateRangePicker_picker {
      left: -300px !important;
      top: 55px !important;
    }
    .DayPicker {
      border-top-right-radius: 0 !important;
    }
    .DateInput {
      &:hover {
        background-color: inherit;
      }
      &:first-child,
      &:last-child {
        border-radius: 0;
        box-shadow: none;
        ::after {
          top: 10px;
          left: 10px;
          font-size: 12px;
        }
      }
      &:first-child {
        border-top-left-radius: 12px;
      }
      &:last-child {
        border-top-right-radius: 12px;
      }
      input {
        padding: 17px 10px 0px 10px;
      }
    }
    .DateRangePickerInput_arrow {
      height: 100%;
      background-color: ${palette.gray_c4};
    }
    .DateInput_input__disabled {
      background-color: ${palette.gray_f7};
      border-top-right-radius: 12px;
      z-index: 0;
      font-style: normal;
    }
    .CalendarDay__blocked_calendar {
      text-decoration: line-through !important;
      color: #cacccd;
      &:hover {
        background-color: inherit;
      }
    }
  }
`;

const BookingWindow = ({
  blockedDayList,
  availability,
}: {
  blockedDayList: string[];
  availability: number;
}) => {
  const search = useSelector((state) => state.search);
  const checkIn = useSelector((state) => state.search.checkIn);
  const checkOut = useSelector((state) => state.search.checkOut);
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const isBlocked = (day: moment.Moment) => {
    return blockedDayList.some((date) => day.isSame(date), "day");
  };

  const handleChange = ({
    startDate,
    endDate,
  }: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    if (startDate) dispatch(searchActions.setCheckIn(startDate.toISOString()));
    if (endDate) dispatch(searchActions.setCheckOut(endDate.toISOString()));
  };

  return (
    <Container>
      {!query.checkIn && !query.checkOut && (
        <div className="booking-window_title">
          요금을 확인하려면 날짜를
          <br /> 입력하세요.
        </div>
      )}
      <div className="booking-window_date-picker">
        <DateRangePicker
          checkIn={toMomentObject(checkIn ? new Date(checkIn) : null)}
          checkOut={toMomentObject(checkOut ? new Date(checkOut) : null)}
          onChange={handleChange}
          isBlocked={isBlocked}
        />
      </div>
    </Container>
  );
};

export default BookingWindow;
