import { useRouter } from "next/router";
import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import Bathroom from "./bathroom";
import Bedroom from "./bedroom";
import Building from "./building";
import Location from "./location";

const progressWidth = (path: string) => {
  switch (path) {
    case "building":
      return css`
        width: calc(100% * (1 / 4));
      `;
    case "bedroom":
      return css`
        width: calc(100% * (2 / 4));
      `;
    case "bathroom":
      return css`
        width: calc(100% * (3 / 4));
      `;
    case "location":
      return css`
        width: calc(100% * (4 / 4));
      `;
    default:
      return css`
        width: 0;
      `;
  }
};

const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  background-color: #edefed;
  position: fixed;
  top: 80px;
`;

const Progress = styled.div<{ path: string }>`
  height: 100%;
  background-color: ${palette.dark_cyan};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: width 1s linear;
  ${({ path }) => progressWidth(path)}
`;

const Container = styled.div`
  width: 100%;
  max-width: 550px;
  padding: 62px 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 80px);
  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
  }
  h3 {
    color: ${palette.gray_76};
    margin-bottom: 24px;
  }
`;

const Hosting = () => {
  const { pathname } = useRouter();
  const path = pathname.split("/").pop();
  return (
    <>
      <ProgressBar>
        <Progress path={path} />
      </ProgressBar>
      <Container>
        {path === "building" && <Building />}
        {path === "bedroom" && <Bedroom />}
        {path === "bathroom" && <Bathroom />}
        {path === "location" && <Location />}
      </Container>
    </>
  );
};

export default Hosting;
