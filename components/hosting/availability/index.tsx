import RadioInput from "components/common/RadioInput";
import { availabilityList } from "lib/staticData";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div``;

const Availability = () => {
  const { availability } = useSelector((state) => state.hosting);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(hostingActions.setAvailabilty(Number(e.target.value)));
  };

  return (
    <>
      <Container>
        <h1>얼마나 먼 날짜까지 예약할 수 있나요?</h1>
        <RadioInput
          options={availabilityList}
          currentValue={availability}
          onChange={handleChange}
        />
        <h3>팁: 호스트 대부분은 최대 3개월간의 달력을 업데이트합니다.</h3>
      </Container>
      <Footer nextHref="/become-a-host/calendar" />
    </>
  );
};

export default Availability;
