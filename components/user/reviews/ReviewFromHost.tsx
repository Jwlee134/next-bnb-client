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

const ReviewFromHost = ({ user }: { user: IUser }) => {
  const { reviewFromHost, reviewFromHostPage } = useSelector(
    (state) => state.user.userDetail
  );
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);

  const fetchReview = async () => {
    try {
      const { data } = await getReviewAPI({
        id: user._id,
        page: reviewFromHostPage,
        value: "host",
      });
      dispatch(userActions.setReviewFromHost(data));
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    if (isEmpty(user.reviewFromHost)) return;
    if (isEmpty(reviewFromHost)) fetchReview();
    if (clicked) fetchReview();
  }, [reviewFromHostPage, clicked, user]);

  const handleClick = () => {
    setClicked(true);
    dispatch(userActions.setReviewFromHostPage(reviewFromHostPage + 1));
  };

  return (
    <Container>
      {reviewFromHost.map((review, i) => (
        <ReviewCard review={review} key={i} />
      ))}
      {user.reviewFromHost.length > reviewFromHost.length && (
        <Button onClick={handleClick} backgroundColor="white">
          더 보기
        </Button>
      )}
    </Container>
  );
};

export default ReviewFromHost;
