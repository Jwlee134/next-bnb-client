import useRoom from "hooks/useRoom";
import { isEmpty } from "lodash";
import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { IoIosStar } from "react-icons/io";
import { IReview } from "types/review";
import ReviewCard from "components/common/ReviewCard";
import Button from "components/common/Button";
import useModal from "hooks/useModal";
import ReviewModal from "components/modal/reviewModal";
import RatingBar from "./RatingBar";

const Container = styled.div`
  padding: 48px 0px;
  border-bottom: 1px solid ${palette.gray_dd};
  .detail_rating_empty {
    font-weight: 300;
  }
  .detail_rating {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    svg {
      color: ${palette.bittersweet};
      margin-right: 5px;
      margin-bottom: 3px;
    }
    span {
      font-size: 20px;
      font-weight: 500;
    }
  }
  .detail_rating-container {
    .detail_rating-container_bar {
      margin-bottom: 16px;
      > div {
        margin-bottom: 16px;
      }
    }
    .detail_rating-container_bar,
    .detail_rating-container_card {
      display: flex;
      flex-wrap: wrap;
      > div {
        width: 45%;
        margin-right: 5%;
      }
    }
    button {
      width: fit-content;
      padding: 0px 24px;
    }
  }
`;

const Rating = () => {
  const { room } = useRoom();
  const { openModal, closeModal, ModalPortal } = useModal();

  if (!room) return null;
  return (
    <>
      <Container>
        <div className="detail_content-title">후기</div>
        {isEmpty(room.review) && (
          <div className="detail_rating_empty">아직 후기가 없습니다.</div>
        )}
        {!isEmpty(room.review) && (
          <>
            <div className="detail_rating">
              <IoIosStar size={22} />
              <span>
                {room.avgOfRating}점(후기 {room.review.length}개)
              </span>
            </div>
            <div className="detail_rating-container">
              <div className="detail_rating-container_bar">
                {room.rating.map((item, i) => (
                  <div key={i}>
                    <RatingBar item={item} />
                  </div>
                ))}
              </div>
              <div className="detail_rating-container_card">
                {room.review.slice(0, 6).map((review: IReview, i: number) => (
                  <div key={i}>
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
              {room.review.length > 6 && (
                <Button whiteBackground onClick={openModal}>
                  후기 {room.review.length}개 모두 보기
                </Button>
              )}
            </div>
          </>
        )}
      </Container>
      <ModalPortal>
        <ReviewModal
          ratingAvg={room.avgOfRating}
          rating={room.rating}
          review={room.review}
          closeModal={closeModal}
        />
      </ModalPortal>
    </>
  );
};

export default Rating;
