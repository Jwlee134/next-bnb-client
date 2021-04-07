import DateRangePicker from "components/common/DateRangePicker";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 32px;
  cursor: pointer;
  @media ${({ theme }) => theme.device.pcSmall} {
    .DateRangePicker_picker {
      left: -210px !important;
    }
  }
`;

const CheckIn = () => {
  return (
    <div className="search-container search-date">
      <Container>
        <DateRangePicker />
      </Container>
    </div>
  );
};

export default CheckIn;
