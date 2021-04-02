import { quickSearchKeywords } from "lib/staticData";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { makeQueryString } from "utils";

const Container = styled.div`
  width: 100%;
  margin: 40px 0px;
  .search-card_title {
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 24px;
  }
  .search-card_container {
    display: flex;
    justify-content: space-between;
    a {
      width: 32%;
      div {
        width: 100%;
        padding-top: 75%;
        position: relative;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
      }
      span {
        display: block;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
`;

const SearchCard = () => {
  return (
    <Container>
      <div className="search-card_title">어디에서나, 여행은 살아보는 거야!</div>
      <div className="search-card_container">
        <Link
          href={`/search/rooms${makeQueryString({
            ...quickSearchKeywords,
            value: "집 전체",
            roomType: "entire",
          })}`}
        >
          <a>
            <div>
              <img src="/static/image/home/entire.jpg" alt="" />
            </div>
            <span>집 전체</span>
          </a>
        </Link>
        <Link
          href={`/search/rooms${makeQueryString({
            ...quickSearchKeywords,
            value: "독특한 숙소",
            buildingType: "독특한 숙소",
          })}`}
        >
          <a>
            <div>
              <img src="/static/image/home/unique.jpg" alt="" />
            </div>
            <span>독특한 숙소</span>
          </a>
        </Link>
        <Link
          href={`/search/rooms${makeQueryString({
            ...quickSearchKeywords,
            value: "부티크 호텔",
            buildingType: "부티크 호텔",
          })}`}
        >
          <a>
            <div>
              <img src="/static/image/home/boutique.jpg" alt="" />
            </div>
            <span>부티크 호텔</span>
          </a>
        </Link>
      </div>
    </Container>
  );
};

export default SearchCard;
