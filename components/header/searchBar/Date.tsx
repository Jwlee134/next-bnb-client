import DateRangePicker from "components/common/DateRangePicker";
import moment from "moment";
import React from "react";
import { toMomentObject } from "react-dates";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { searchActions } from "store/search";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 32px;
  cursor: pointer;
`;

const CheckIn = () => {
  const checkIn = useSelector((state) => state.search.checkIn);
  const checkOut = useSelector((state) => state.search.checkOut);
  const dispatch = useDispatch();

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
    <div className="search-container search-date">
      <Container>
        <DateRangePicker
          checkIn={toMomentObject(checkIn ? new Date(checkIn) : null)}
          checkOut={toMomentObject(checkOut ? new Date(checkOut) : null)}
          onChange={handleChange}
        />
      </Container>
    </div>
  );
};

export default CheckIn;
