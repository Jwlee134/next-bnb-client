import React, { useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import styled from "styled-components";
import BookingWindow from "../bookingWindow";

const Container = styled.div`
  position: fixed;
  bottom: 76px;
  right: 12px;
  width: 56px;
  height: 56px;
  background-color: white;
  border-radius: 50%;
  box-shadow: rgb(0 0 0 / 15%) 0px 4px 6px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
`;

const MobileBookingButton = () => {
  const [windowOpened, setWindowOpened] = useState(false);

  if (!windowOpened) {
    return (
      <Container
        onClick={() => {
          setWindowOpened(true);
        }}
      >
        <AiOutlineSchedule size={30} />
      </Container>
    );
  }
  return <BookingWindow isMobile setWindowOpened={setWindowOpened} />;
};

export default MobileBookingButton;
