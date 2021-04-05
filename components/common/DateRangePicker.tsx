import React, { useState } from "react";

import moment from "moment";
import "moment/locale/ko";

import "react-dates/initialize";
import {
  DateRangePicker as RangePicker,
  DayPickerRangeController,
  FocusedInputShape,
  toMomentObject,
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { useDispatch } from "react-redux";
import { searchActions } from "store/search";
import { useSelector } from "store";

moment.locale("ko");

interface ContainerProps {
  focused: "startDate" | "endDate";
  focusEffect: "normal" | "boldBorder";
}

const getFocusEffect = (focusEffect: "normal" | "boldBorder") => {
  if (focusEffect === "normal") {
    return css`
      border-radius: 32px;
      &:hover {
        background-color: white;
      }
      box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.15),
        0px 3px 8px rgba(0, 0, 0, 0.1);
    `;
  }
  return css`
    box-shadow: 0 0 0 1px black;
  `;
};

const Container = styled.div<ContainerProps>`
  .DateRangePicker {
    position: absolute;
    width: 100%;
    height: 100%;
    > div {
      height: 100%;
    }
  }
  .DateRangePickerInput {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .DateInput:first-child {
      ::after {
        position: absolute;
        content: "체크인";
        color: black;
        left: 20px;
        font-size: 14px;
        top: 15px;
      }
      ${({ focused, focusEffect }) =>
        focused === "startDate" && getFocusEffect(focusEffect)};
    }
    .DateInput:last-child {
      ::after {
        position: absolute;
        content: "체크아웃";
        color: black;
        left: 20px;
        font-size: 14px;
        top: 15px;
      }
      ${({ focused, focusEffect }) =>
        focused === "endDate" && getFocusEffect(focusEffect)};
    }
  }
  .DateInput_fang,
  .DayPickerKeyboardShortcuts_buttonReset,
  .DateRangePickerInput_arrow_svg,
  .DateInput_screenReaderMessage,
  .DayPickerNavigation__verticalScrollable_prevNav {
    display: none !important;
  }
  .DateRangePicker_picker {
    top: 80px !important;
  }
  .DayPicker {
    border-radius: 32px !important;
  }
  .DateInput_input {
    font-weight: 500;
    font-size: 14px;
  }
  .CalendarMonthGrid,
  .CalendarMonth,
  .DateInput,
  .DateInput_input,
  .DateRangePicker_picker,
  .DateRangePickerInput,
  .CalendarDay {
    background-color: transparent;
  }
  .DayPicker_transitionContainer {
    cursor: default;
  }
  .DateInput {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 32px;
    &:hover {
      background-color: ${palette.gray_eb};
    }
    input {
      padding: 0;
      height: 100%;
      border-bottom: 0;
      cursor: pointer;
      padding: 0px 20px;
      padding-top: 15px;
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      ::placeholder {
        font-weight: 400;
      }
    }
  }
  .DateInput_input__focused {
    border-bottom: 0;
  }
  .CalendarDay {
    border: none;
    outline: none;
    vertical-align: middle;
  }
  .CalendarDay__hovered_span {
    background-color: #e4e7e7;
    border-radius: 50%;
  }
  .DateRangePicker_picker {
    position: absolute;
  }
  .CalendarDay__default:hover:not(.CalendarDay__blocked_out_of_range, .CalendarDay__selected) {
    border-radius: 50% !important;
    background-color: #e4e7e7;
  }
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
  }
  .CalendarDay__selected_span {
    background-color: #e4e7e7;
    color: black;
    border-radius: 50%;
  }
  .DayPickerNavigation_button {
    outline: none;
    border-radius: 100px;
  }
  .DateRangePickerInput_arrow {
    width: 1px;
    background-color: ${palette.gray_eb};
    height: 28px;
    margin: auto 0;
  }
  .CalendarDay__default:hover {
    border: 0 !important;
  }
  .DayPicker__verticalScrollable {
    height: calc(100vh - 144px);
  }
  .DayPickerNavigation {
    width: 33%;
    margin: 0 auto;
    div {
      background-color: transparent;
    }
  }
  .DayPickerNavigation_button {
    border: 0;
    box-shadow: none;
  }
  .DayPicker__verticalScrollable {
    border-radius: 0 !important;
  }
`;

interface Props {
  isBlocked?: (day: moment.Moment) => boolean;
  maxDate?: moment.Moment;
  focusEffect?: string;
  keepOpenOnDateSelect?: boolean;
  mode?: "dayPickerRangeController" | "dateRangePicker";
}

const DateRangePicker = ({
  isBlocked,
  maxDate,
  focusEffect = "normal",
  keepOpenOnDateSelect = true,
  mode = "dateRangePicker",
}: Props) => {
  const checkIn = useSelector((state) => state.search.checkIn);
  const checkOut = useSelector((state) => state.search.checkOut);

  const [focused, setFocused] = useState<FocusedInputShape | null>(
    mode === "dateRangePicker" ? null : "startDate"
  );
  const dispatch = useDispatch();

  const handleFocus = (focusedInput: FocusedInputShape | null) => {
    setFocused(focusedInput);
  };

  return (
    <Container
      focused={focused as "startDate" | "endDate"}
      focusEffect={focusEffect as "normal" | "boldBorder"}
    >
      {mode === "dateRangePicker" && (
        <RangePicker
          startDate={toMomentObject(checkIn ? new Date(checkIn) : null)}
          endDate={toMomentObject(checkOut ? new Date(checkOut) : null)}
          onDatesChange={({ startDate, endDate }) => {
            if (startDate) {
              dispatch(searchActions.setCheckIn(startDate.toISOString()));
            }
            if (endDate) {
              dispatch(searchActions.setCheckOut(endDate.toISOString()));
            }
          }}
          focusedInput={focused}
          onFocusChange={handleFocus}
          startDateId="dateRangePicker-start"
          endDateId="dateRangePicker-end"
          startDatePlaceholderText="날짜 선택"
          endDatePlaceholderText="날짜 선택"
          noBorder
          readOnly
          displayFormat="MM월 DD일"
          keepOpenOnDateSelect={keepOpenOnDateSelect}
          isDayBlocked={isBlocked}
          minDate={moment(new Date())}
          maxDate={maxDate}
          isOutsideRange={(day) =>
            day.isBefore(moment(new Date()), "day") ||
            (maxDate ? day.isAfter(maxDate, "day") : false)
          }
        />
      )}
      {mode === "dayPickerRangeController" && (
        <DayPickerRangeController
          startDate={toMomentObject(checkIn ? new Date(checkIn) : null)}
          endDate={toMomentObject(checkOut ? new Date(checkOut) : null)}
          onDatesChange={({ startDate, endDate }) => {
            if (startDate) {
              dispatch(searchActions.setCheckIn(startDate.toISOString()));
            }
            if (endDate) {
              dispatch(searchActions.setCheckOut(endDate.toISOString()));
            }
          }}
          focusedInput={focused || "startDate"}
          onFocusChange={handleFocus}
          initialVisibleMonth={null}
          orientation="verticalScrollable"
          isOutsideRange={(day) => day.isBefore(moment(new Date()), "day")}
          numberOfMonths={2}
        />
      )}
    </Container>
  );
};

export default DateRangePicker;
