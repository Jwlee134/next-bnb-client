import Button from "components/common/Button";
import ReviewCard from "components/common/ReviewCard";
import { getReviewAPI } from "lib/api/review";
import { isEmpty } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { userActions } from "store/user";
import styled from "styled-components";
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

const ReviewFromGuest = ({ user }: { user: IUser }) => {
  const { reviewFromGuest, reviewFromGuestPage } = useSelector(
    (state) => state.user.userDetail
  );
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);

  const fetchReview = async () => {
    try {
      const { data } = await getReviewAPI({
        id: user._id,
        page: reviewFromGuestPage,
        value: "guest",
      });
      dispatch(userActions.setReviewFromGuest(data));
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    if (isEmpty(user.reviewFromGuest)) return;
    if (isEmpty(reviewFromGuest)) fetchReview();
    if (clicked) fetchReview();
  }, [reviewFromGuestPage, clicked, user]);

  const handleClick = () => {
    setClicked(true);
    dispatch(userActions.setReviewFromGuestPage(reviewFromGuestPage + 1));
  };

  return (
    <Container>
      {reviewFromGuest.map((review, i) => (
        <Fragment key={i}>
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
          <ReviewCard review={review} />
        </Fragment>
      ))}
      {user.reviewFromGuest.length > reviewFromGuest.length &&
        user.reviewFromGuest.length > 5 && (
          <Button onClick={handleClick} backgroundColor="white">
            더 보기
          </Button>
        )}
    </Container>
  );
};

export default ReviewFromGuest;
