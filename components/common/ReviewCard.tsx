import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { IReview } from "types/review";

const Container = styled.div`
  margin-bottom: 40px;
  .review-card_profile-container {
    display: flex;
    margin-bottom: 16px;
    a {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 12px;
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .review-card_profile {
      display: flex;
      flex-direction: column;
      justify-content: center;
      div:last-child {
        margin-top: 3px;
        font-weight: 100;
        font-size: 14px;
        opacity: 0.7;
      }
    }
  }
  .review-card_contents {
    font-weight: 300;
    line-height: 1.5;
  }
`;

const ReviewCard = ({ review }: { review: IReview }) => (
  <Container>
    <div className="review-card_profile-container">
      <Link href={`/user/${review.creator._id}`}>
        <a>
          <img src={review.creator.avatarUrl} alt="" />
        </a>
      </Link>
      <div className="review-card_profile">
        <div>{review.creator.name}</div>
        <div>{format(new Date(review.createdAt), "yyyy년 MM월")}</div>
      </div>
    </div>
    <div className="review-card_contents">{review.text}</div>
  </Container>
);

export default React.memo(ReviewCard);
