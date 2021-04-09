import Button from "components/common/Button";
import ReviewCard from "components/common/ReviewCard";
import { getReviewAPI } from "lib/api/review";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { userActions } from "store/user";
import styled from "styled-components";
import { IUser } from "types/user";

const Container = styled.div``;

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
        <ReviewCard review={review} key={i} />
      ))}
      {user.reviewFromGuest.length > reviewFromGuest.length && (
        <Button onClick={handleClick} backgroundColor="white">
          더 보기
        </Button>
      )}
    </Container>
  );
};

export default ReviewFromGuest;
