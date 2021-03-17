import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div<{ whiteBackground: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -12.5px 0 0 -12.5px;
  width: 25px;
  height: 25px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.75s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  ${({ whiteBackground }) =>
    whiteBackground &&
    css`
      border-top-color: black;
    `}
`;

const Loader = ({ whiteBackground = false }: { whiteBackground?: boolean }) => (
  <Container whiteBackground={whiteBackground} />
);

export default Loader;
