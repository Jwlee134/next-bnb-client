import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import Bathroom from "./bathroom";
import Bedroom from "./bedroom";
import Building from "./building";
import Location from "./location";
import Amenities from "./amenities";
import Spaces from "./spaces";
import Photos from "./photos";
import Description from "./description";
import Title from "./title";
import Rules from "./rules";

const Pin = dynamic(() => import("./pin"), { ssr: false });

const progressWidth = (path: string | undefined) => {
  switch (path) {
    case "building":
      return css`
        width: calc(100% * (1 / 15));
      `;
    case "bedroom":
      return css`
        width: calc(100% * (2 / 15));
      `;
    case "bathroom":
      return css`
        width: calc(100% * (3 / 15));
      `;
    case "location":
      return css`
        width: calc(100% * (4 / 15));
      `;
    case "pin":
      return css`
        width: calc(100% * (5 / 15));
      `;
    case "amenities":
      return css`
        width: calc(100% * (6 / 15));
      `;
    case "spaces":
      return css`
        width: calc(100% * (7 / 15));
      `;
    case "photos":
      return css`
        width: calc(100% * (8 / 15));
      `;
    case "description":
      return css`
        width: calc(100% * (9 / 15));
      `;
    case "title":
      return css`
        width: calc(100% * (10 / 15));
      `;
    case "rules":
      return css`
        width: calc(100% * (11 / 15));
      `;
    case "":
      return css`
        width: calc(100% * (12 / 15));
      `;
    case "":
      return css`
        width: calc(100% * (13 / 15));
      `;
    case "":
      return css`
        width: calc(100% * (14 / 15));
      `;
    case "":
      return css`
        width: calc(100% * (15 / 15));
      `;
    default:
      return css`
        width: 0;
      `;
  }
};

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #edefed;
  position: fixed;
  top: 80px;
  z-index: 9;
`;

const Progress = styled.div<{ path: string | undefined }>`
  height: 100%;
  background-color: ${palette.dark_cyan};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
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
        {path === "pin" && <Pin />}
        {path === "amenities" && <Amenities />}
        {path === "spaces" && <Spaces />}
        {path === "photos" && <Photos />}
        {path === "description" && <Description />}
        {path === "title" && <Title />}
        {path === "rules" && <Rules />}
      </Container>
    </>
  );
};

export default Hosting;
