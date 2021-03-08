import React, { useState } from "react";

import moment from "moment";
import "moment/locale/ko";

import "react-dates/initialize";
import { DateRangePicker as RangePicker, FocusedInputShape } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import styled, { css } from "styled-components";
import palette from "styles/palette";

moment.locale("ko");

const Container = styled.div<{ focused: boolean }>`
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
    border-radius: 32px;
    &:hover {
      background-color: ${palette.gray_eb};
    }
    ${({ focused }) =>
      focused &&
      css`
        &:hover {
          background-color: white;
        }
        box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.15),
          0px 3px 8px rgba(0, 0, 0, 0.1);
      `}
  }
  .DateInput_fang {
    display: none;
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
    height: 100%;
    input {
      padding: 0;
      height: 100%;
      border-bottom: 0;
      cursor: pointer;
      text-align: center;
    }
  }
  .DateInput_input__focused {
    border-bottom: 0;
  }
  .DayPickerKeyboardShortcuts_buttonReset {
    display: none;
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
`;

interface Props {
  onChange: ({
    startDate,
    endDate,
  }: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => void;
  checkIn: moment.Moment | null;
  checkOut: moment.Moment | null;
}

const DateRangePicker = ({ checkIn, checkOut, onChange }: Props) => {
  const [focused, setFocused] = useState<FocusedInputShape | null>(null);

  const handleFocus = (focusedInput: FocusedInputShape | null) => {
    setFocused(focusedInput);
  };

  return (
    <Container focused={focused !== null}>
      <RangePicker
        startDate={checkIn}
        endDate={checkOut}
        onDatesChange={({ startDate, endDate }) => {
          onChange({ startDate, endDate });
        }}
        focusedInput={focused}
        onFocusChange={handleFocus}
        startDateId="your_unique_start_date_id"
        endDateId="your_unique_end_date_id"
        startDatePlaceholderText="체크인"
        endDatePlaceholderText="체크아웃"
        noBorder
        readOnly
        displayFormat="MM월 DD일"
      />
    </Container>
  );
};

export default DateRangePicker;
