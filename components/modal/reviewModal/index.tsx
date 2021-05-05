import React, { useEffect } from "react";
import styled from "styled-components";
import { IoIosStar } from "react-icons/io";
import palette from "styles/palette";
import RatingBar from "components/room/detail/rating/RatingBar";
import ReviewCard from "components/common/ReviewCard";
import { useSelector } from "store";
import { tabletSmallBreakpoint } from "styles/theme";
import { IRoom } from "types/room";
import { getRoomReviewAPI } from "lib/api/review";
import { useInView } from "react-intersection-observer";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { roomActions } from "store/room";
import ModalHeader from "../ModalHeader";

const Container = styled.div`
  width: 1032px;
  max-height: 80vh;
  display: flex;
  .review-modal_left-container {
    width: 32.5%;
    padding: 24px 0px 0px 24px;
    margin-right: 7.5%;
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
    padding-top: 24px;
    > div {
      margin-right: 24px;
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 90vw;
    .review-modal_left-container {
      margin-right: 36px;
      width: 40%;
      > div:first-child {
        span {
          font-size: 22px;
        }
      }
    }
    .review-modal_right-container {
      > div {
        margin-right: 24px;
      }
    }
  }
  @media ${({ theme }) => theme.device.tabletSmall} {
    max-height: 75vh !important;
    flex-direction: column;
    padding: 0;
    .review-modal_left-container {
      padding: 0px 24px 24px 24px;
      width: 100%;
      position: initial;
      margin-right: 0;
    }
    .review-modal_right-container {
      width: 100%;
      > div:not(:first-child) {
        margin-left: 24px;
      }
    }
  }
`;

const Target = styled.div`
  width: 100%;
  height: 12px;
  margin-left: 0 !important;
`;

const ReviewModal = ({
  room,
  closeModal,
}: {
  room: IRoom;
  closeModal: () => void;
}) => {
  const innerWidth = useSelector((state) => state.common.innerWidth);
  const { review, page } = useSelector((state) => state.room.detail);
  const { ref, inView } = useInView({
    rootMargin: "48px 0px",
  });
  const dispatch = useDispatch();

  const fetchReview = async () => {
    try {
      const { data } = await getRoomReviewAPI({
        id: room._id,
        page: page + 1,
      });
      dispatch(
        roomActions.setReview({ review: [...review, ...data], page: page + 1 })
      );
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(
        roomActions.setReview({ review: room.review.slice(0, 6), page: 1 })
      );
    };
  }, []);

  useEffect(() => {
    if (inView && room.review.length > review.length) fetchReview();
  }, [inView, room, review]);

  return (
    <>
      <ModalHeader onClick={closeModal}> </ModalHeader>
      <Container>
        {innerWidth >= tabletSmallBreakpoint && (
          <div className="review-modal_left-container">
            <div>
              <IoIosStar size={34} />
              <span>
                {room.avgOfRating}점(후기 {room.review.length}개)
              </span>
            </div>
            {room.rating.map((item, i) => (
              <div key={i}>
                <RatingBar item={item} />
              </div>
            ))}
          </div>
        )}
        <div className="review-modal_right-container">
          {innerWidth < tabletSmallBreakpoint && (
            <div className="review-modal_left-container">
              <div>
                <IoIosStar size={34} />
                <span>
                  {room.avgOfRating}점(후기 {room.review.length}개)
                </span>
              </div>
              {room.rating.map((item, i) => (
                <div key={i}>
                  <RatingBar item={item} />
                </div>
              ))}
            </div>
          )}
          {!isEmpty(review) && (
            <>
              {review.map((item, i) => (
                <ReviewCard key={i} review={item} />
              ))}
              <Target ref={ref} />
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default ReviewModal;
