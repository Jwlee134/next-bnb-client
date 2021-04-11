import React from "react";
import styled from "styled-components";
import Loader from "./Loader";

const Container = styled.div`
  width: 100vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
  line-height: 1.5;
  div:first-child {
    position: initial;
    width: 60px;
    height: 60px;
    margin-bottom: 16px;
  }
  div:nth-child(2) {
    font-size: 25px;
    font-weight: 500;
  }
`;

const OauthText = () => (
  <Container>
    <Loader whiteBackground />
    <div>We are logging you in.</div>
    Do not refresh the page.
  </Container>
);

export default OauthText;
