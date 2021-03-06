import DatePicker from "components/common/DatePicker";
import React from "react";
import { DayModifiers } from "react-day-picker";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div`
  > div {
    margin-bottom: 24px;
  }
`;

const Calendar = () => {
  const { blockedDayList } = useSelector((state) => state.hosting);
  const dispatch = useDispatch();

  const handleClick = (day: Date, { selected }: DayModifiers) => {
    if (!selected) {
      dispatch(
        hostingActions.setBlockedDayList([...blockedDayList, day.toISOString()])
      );
    } else {
      const filtered = blockedDayList.filter(
        (date) => date !== day.toISOString()
      );
      dispatch(hostingActions.setBlockedDayList(filtered));
    }
  };

  const formatDayList = blockedDayList.map((day) => new Date(day));

  return (
    <>
      <Container>
        <h1>예약 가능 여부 설정하기</h1>
        <h3>
          간단한 방법으로 달력을 수정할 수 있어요. 예약을 차단하거나 차단 해제할
          날짜를 선택하기만 하면 됩니다. 숙소를 등록한 후에도 언제든지 변경할 수
          있습니다.
        </h3>
        <DatePicker onDayClick={handleClick} selectedDays={formatDayList} />
      </Container>
      <Footer nextHref="/become-a-host/price" />
    </>
  );
};

export default Calendar;
