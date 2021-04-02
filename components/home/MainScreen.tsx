import { quickSearchKeywords } from "lib/staticData";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { makeQueryString } from "utils";

const Container = styled.div`
  padding-bottom: 32px;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .home_main_label-container {
    width: 100%;
    height: calc(100% - 72px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    float: bottom;
    .home_main_label {
      font-size: 56px;
      font-weight: 500;
      color: white;
      text-shadow: 0px 0px 3px #000000;
    }
    a {
      width: 170px;
      height: 40px;
      .home_main_button {
        border: 0;
        outline: 0;
        background-color: white;
        width: 100%;
        height: 100%;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 10px;
        margin-top: 12px;
        cursor: pointer;
        font-size: 16px;
        &:hover {
          background-color: #ececec;
        }
      }
    }
  }
`;

const MainScreen = () => {
  return (
    <Container>
      <div />
      <div className="home_main_label-container">
        <div className="home_main_label">
          이제, 여행은
          <br /> 가까운 곳에서
        </div>
        <Link
          href={`/search/rooms${makeQueryString({
            value: "근처의 숙소 둘러보기",
            ...quickSearchKeywords,
          })}`}
        >
          <a>
            <button className="home_main_button">근처의 숙소 둘러보기</button>
          </a>
        </Link>
      </div>
    </Container>
  );
};

export default MainScreen;
