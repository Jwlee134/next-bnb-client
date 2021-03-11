import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { SiAirbnb } from "react-icons/si";

import Building from "./building";
import Bathroom from "./bathroom";
import Bedroom from "./bedroom";
import Location from "./location";
import Amenities from "./amenities";
import Spaces from "./spaces";
import Photos from "./photos";
import Description from "./description";
import Title from "./title";
import Rules from "./rules";
import Availability from "./availability";
import Calendar from "./calendar";
import Price from "./price";
import Register from "./register";

const Pin = dynamic(() => import("./pin"), { ssr: false });

const totalPage = 15;

const progressWidth = (path: string | undefined) => {
  switch (path) {
    case "building":
      return css`
        width: calc(100% * (1 / ${totalPage}));
      `;
    case "bedroom":
      return css`
        width: calc(100% * (2 / ${totalPage}));
      `;
    case "bathroom":
      return css`
        width: calc(100% * (3 / ${totalPage}));
      `;
    case "location":
      return css`
        width: calc(100% * (4 / ${totalPage}));
      `;
    case "pin":
      return css`
        width: calc(100% * (5 / ${totalPage}));
      `;
    case "amenities":
      return css`
        width: calc(100% * (6 / ${totalPage}));
      `;
    case "spaces":
      return css`
        width: calc(100% * (7 / ${totalPage}));
      `;
    case "photos":
      return css`
        width: calc(100% * (8 / ${totalPage}));
      `;
    case "description":
      return css`
        width: calc(100% * (9 / ${totalPage}));
      `;
    case "title":
      return css`
        width: calc(100% * (10 / ${totalPage}));
      `;
    case "rules":
      return css`
        width: calc(100% * (11 / ${totalPage}));
      `;
    case "availability":
      return css`
        width: calc(100% * (12 / ${totalPage}));
      `;
    case "calendar":
      return css`
        width: calc(100% * (13 / ${totalPage}));
      `;
    case "price":
      return css`
        width: calc(100% * (14 / ${totalPage}));
      `;
    case "register":
      return css`
        width: calc(100% * (15 / ${totalPage}));
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
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

const Header = styled.div`
  width: 100%;
  height: 80px;
  padding: 0px 30px;
  background-color: white;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  svg {
    color: ${palette.dark_cyan};
    cursor: pointer;
  }
  z-index: 10;
`;

const Hosting = () => {
  const router = useRouter();
  const path = router.pathname.split("/").pop();

  const handleRefresh = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleRefresh);
    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, []);

  return (
    <>
      <Header>
        <SiAirbnb size={32} onClick={() => router.push("/")} />
      </Header>
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
        {path === "availability" && <Availability />}
        {path === "calendar" && <Calendar />}
        {path === "price" && <Price />}
        {path === "register" && <Register />}
      </Container>
    </>
  );
};

export default Hosting;
