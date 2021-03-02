import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import Bedroom from "./bedroom";
import Building from "./building";

const Container = styled.div`
  width: 100%;
  padding: 62px 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 80px);
  h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 56px;
  }
  h2 {
    font-size: 16px;
    color: ${palette.gray_76};
    margin-bottom: 6px;
    font-weight: 700;
  }
  h3 {
    color: ${palette.gray_76};
    margin-bottom: 8px;
  }
`;

const Hosting = () => {
  const { pathname } = useRouter();
  const path = pathname.split("/").pop();
  return (
    <Container>
      {path === "building" && <Building />}
      {path === "bedroom" && <Bedroom />}
    </Container>
  );
};

export default Hosting;
