import DateRangePicker from "components/common/DateRangePicker";
import moment, { Moment } from "moment";
import React, { useEffect } from "react";
import { useSelector } from "store";
import styled from "styled-components";
import palette from "styles/palette";
import { useRouter } from "next/router";
import { makeQueryString } from "utils";
import useRoom from "hooks/useRoom";

const Container = styled.div`
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
      ::after {
        top: 10px !important;
        left: 10px !important;
        font-size: 12px !important;
      }
    }
    &:first-child {
      border-top-left-radius: 12px;
    }
    &:last-child {
      border-top-right-radius: 12px;
    }
    input {
      padding: 20px 10px 0px 10px;
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
      background-color: inherit !important;
    }
  }
`;

const DatePicker = () => {
  const { room } = useRoom();
  const checkIn = useSelector((state) => state.search.checkIn);
  const checkOut = useSelector((state) => state.search.checkOut);

  const router = useRouter();
  const { query } = router;

  const isBlocked = (day: Moment) => {
    if (!room) return;
    return room.blockedDayList.some((date) => day.isSame(date, "day"));
  };

  const maxDate = () => {
    if (room && room.availability > 1) {
      return moment(new Date()).add(room.availability, "M");
    }
    return undefined;
  };

  useEffect(() => {
    if (checkIn && room) {
      router.replace(
        `/room/${room._id}${makeQueryString({
          ...query,
          id: "",
          checkIn,
        })}`,
        undefined,
        { scroll: false }
      );
    }
  }, [checkIn]);

  useEffect(() => {
    if (checkOut && room) {
      router.replace(
        `/room/${room._id}${makeQueryString({
          ...query,
          id: "",
          checkOut,
        })}`,
        undefined,
        { scroll: false }
      );
    }
  }, [checkOut]);

  if (!room) return null;
  return (
    <Container>
      <DateRangePicker
        isBlocked={isBlocked as (day: Moment) => boolean}
        maxDate={maxDate()}
        focusEffect="boldBorder"
        keepOpenOnDateSelect={false}
      />
    </Container>
  );
};

export default DatePicker;
