import ReviewCard from "components/common/ReviewCard";
import React, { Fragment } from "react";
import styled from "styled-components";
import { IReview } from "types/review";
import { IUser } from "types/user";

const Container = styled.div`
  .review-list_room-info {
    display: flex;
    margin-bottom: 16px;
    align-items: center;
    a {
      width: 70px;
      height: 48px;
      border-radius: 5px;
      overflow: hidden;
      margin-right: 16px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

const ReviewList = ({ user, tab }: { user: IUser; tab: number }) => {
  return (
    <Container>
      {(tab === 0 ? user.reviewFromGuest : user.reviewFromHost).map(
        (review: IReview, i: number) => (
          <Fragment key={i}>
            {tab === 0 && (
              <div className="review-list_room-info">
                <a
                  href={`/room/${review.room._id}?adults=1&children=0&infants=0`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={review.room.photos[0]} alt="" />
                </a>
                <div>{review.room.title}</div>
              </div>
            )}
            <ReviewCard review={review} />
          </Fragment>
        )
      )}
    </Container>
  );
};

export default ReviewList;
