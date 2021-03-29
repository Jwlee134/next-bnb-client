import React from "react";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: ${palette.bittersweet};
  border-radius: 50%;
  color: white;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
`;

const Notification = ({ children }: { children: React.ReactNode }) => (
  <Container>{children}</Container>
);

export default Notification;
