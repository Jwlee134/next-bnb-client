import React from "react";
import styled from "styled-components";
import { IReview } from "types/review";
import { IoIosStar } from "react-icons/io";
import palette from "styles/palette";
import RatingBar from "components/room/detail/rating/RatingBar";
import ReviewCard from "components/common/ReviewCard";
import ModalHeader from "../ModalHeader";

const Container = styled.div`
  width: 1032px;
  max-height: 80vh;
  padding: 24px;
  display: flex;
  .review-modal_left-container {
    width: 30%;
    margin-right: 10%;
    position: sticky;
    top: 0;
    > div:first-child {
      display: flex;
      align-items: center;
      svg {
        color: ${palette.bittersweet};
        margin-right: 5px;
        margin-bottom: 5px;
      }
      span {
        font-size: 30px;
        font-weight: 700;
      }
    }
    > div:not(:first-child) {
      margin: 12px 0px;
    }
  }
  .review-modal_right-container {
    width: 60%;
    overflow-y: auto;
    > div {
      margin-right: 24px;
    }
  }
`;

const ReviewModal = ({
  ratingAvg,
  rating,
  review,
  closeModal,
}: {
  ratingAvg: number;
  rating: {
    label: string;
    value: number;
  }[];
  review: IReview[];
  closeModal: () => void;
}) => {
  return (
    <>
      <ModalHeader onClick={closeModal}> </ModalHeader>
      <Container>
        <div className="review-modal_left-container">
          <div>
            <IoIosStar size={34} />
            <span>
              {ratingAvg}점(후기 {review.length}개)
            </span>
          </div>
          {rating.map((item, i) => (
            <div key={i}>
              <RatingBar item={item} />
            </div>
          ))}
        </div>
        <div className="review-modal_right-container">
          {review.map((item, i) => (
            <ReviewCard key={i} review={item} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default ReviewModal;
