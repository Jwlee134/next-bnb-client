import Button from "components/common/Button";
import ReviewCard from "components/common/ReviewCard";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { IReview } from "types/review";
import { IUser } from "types/user";
import ReviewFromGuest from "./ReviewFromGuest";
import ReviewFromHost from "./ReviewFromHost";

const Container = styled.div`
  button {
    width: fit-content;
    padding: 0px 24px;
    transition: transform 0.05s ease-in-out;
    &:active {
      transform: scale(0.95);
    }
  }
  .reviews_tab-container {
    display: flex;
    border-bottom: 1px solid ${palette.gray_eb};
    margin-bottom: 24px;
  }
`;

const Tab = styled.div<{ clicked: boolean }>`
  font-size: 15px;
  font-weight: 500;
  padding: 10px;
  cursor: pointer;
  position: relative;
  opacity: 0.7;
  &:hover {
    background-color: ${palette.gray_f7};
    border-radius: 5px;
  }
  ${({ clicked }) =>
    clicked &&
    css`
      cursor: default;
      opacity: 1;
      ::after {
        position: absolute;
        content: "";
        left: 50%;
        transform: translate(-50%);
        bottom: -1px;
        width: 85%;
        height: 1px;
        background-color: ${palette.black};
      }
    `}
`;

const Reviews = ({ user }: { user: IUser }) => {
  const tabs = [
    `게스트가 남긴 후기(${user.reviewFromGuest.length}개)`,
    `호스트의 후기(${user.reviewFromHost.length}개)`,
  ];
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Container>
      {isEmpty(user.rooms) && (
        <>
          {user.reviewFromHost.map((review: IReview, i: number) => (
            <ReviewCard key={i} review={review} />
          ))}
          <Button whiteBackground>후기 더 보기</Button>
        </>
      )}
      {!isEmpty(user.rooms) && (
        <div className="reviews_tab-container">
          {tabs.map((tab, i) => (
            <Tab
              onClick={() => setCurrentTab(i)}
              clicked={currentTab === i}
              key={i}
            >
              {tab}
            </Tab>
          ))}
        </div>
      )}
      {currentTab === 0 && <ReviewFromGuest user={user} />}
      {currentTab === 1 && <ReviewFromHost user={user} />}
    </Container>
  );
};

export default Reviews;
