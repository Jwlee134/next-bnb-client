import DateRangePicker from "components/common/DateRangePicker";
import moment, { Moment } from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import styled from "styled-components";
import palette from "styles/palette";
import querystring from "querystring";
import { searchActions } from "store/search";
import { useRouter } from "next/router";
import { toMomentObject } from "react-dates";
import { deleteIdFromQuery } from "utils";

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
  const room = useSelector((state) => state.room.detail.room);
  const checkIn = useSelector((state) => state.search.checkIn);
  const checkOut = useSelector((state) => state.search.checkOut);

  const router = useRouter();
  const { query } = router;

  const dispatch = useDispatch();

  const isBlocked = (day: Moment) => {
    if (!room) return;
    return room.blockedDayList.some((date) => day.isSame(date, "day"));
  };

  const maxDate = room && moment(new Date()).add(room.availability, "M");

  const handleChange = ({
    startDate,
    endDate,
  }: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    if (startDate && room) {
      router.push(
        `/room/${room._id}?${querystring.stringify(
          deleteIdFromQuery({
            ...query,
            checkIn: startDate.toISOString(),
          })
        )}`,
        undefined,
        { scroll: false }
      );
      dispatch(searchActions.setCheckIn(startDate.toISOString()));
    }
    if (endDate && room) {
      router.push(
        `/room/${room._id}?${querystring.stringify(
          deleteIdFromQuery({
            ...query,
            checkOut: endDate.toISOString(),
          })
        )}`,
        undefined,
        { scroll: false }
      );
      dispatch(searchActions.setCheckOut(endDate.toISOString()));
    }
  };

  if (!room) return null;
  return (
    <Container>
      <DateRangePicker
        checkIn={toMomentObject(checkIn ? new Date(checkIn) : null)}
        checkOut={toMomentObject(checkOut ? new Date(checkOut) : null)}
        onChange={handleChange}
        isBlocked={isBlocked as (day: Moment) => boolean}
        maxDate={maxDate as Moment | undefined}
        focusEffect="boldBorder"
        keepOpenOnDateSelect={false}
      />
    </Container>
  );
};

export default DatePicker;
