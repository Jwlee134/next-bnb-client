import React from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import DayPicker, { DayPickerProps } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { months, weekdays } from "lib/staticData";

const Container = styled.div<{ pathname: boolean }>`
  .DayPicker-wrapper {
    outline: none !important;
  }
  .DayPicker-Month {
  }
  .DayPicker-Day {
    outline: none;
    width: 64px;
    height: 64px;
  }
  .DayPicker-Day--outside {
    &:hover {
      background-color: white;
    }
  }
  .DayPicker-NavButton {
    outline: none;
  }
  ${({ pathname }) =>
    pathname &&
    css`
      .DayPicker-Day--selected {
        background-color: white !important;
        color: #dce0e0 !important;
        &:hover {
          background-color: #f0f0f0 !important;
        }
      }
      .DayPicker:not(.DayPicker--interactionDisabled)
        .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
        background-color: #f0f0f0;
      }
    `}
  .DayPicker-Day--disabled {
    &:hover {
      background-color: white !important;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

interface Props extends DayPickerProps {}

const DatePicker = ({ ...props }: Props) => {
  const { pathname } = useRouter();
  return (
    <Container pathname={pathname.includes("calendar")}>
      <DayPicker
        {...props}
        locale="ko"
        months={months}
        weekdaysShort={weekdays}
        disabledDays={[{ before: new Date() }]}
      />
    </Container>
  );
};

export default DatePicker;
