import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";

const Container = styled.div<{ isNavigator: boolean }>`
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
  ${({ isNavigator }) =>
    isNavigator &&
    css`
      top: 7px;
      right: 47px;
    `}
`;

const Notification = ({
  children,
  isNavigator = false,
}: {
  children: React.ReactNode;
  isNavigator?: boolean;
}) => <Container isNavigator={isNavigator}>{children}</Container>;

export default Notification;
