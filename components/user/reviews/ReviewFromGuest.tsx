import ReviewCard from "components/common/ReviewCard";
import React from "react";
import styled from "styled-components";
import { IReview } from "types/review";
import { IUser } from "types/user";

const Container = styled.div``;

const ReviewFromGuest = ({ user }: { user: IUser }) => {
  return (
    <Container>
      {user.reviewFromGuest.map((review: IReview, i: number) => (
        <ReviewCard key={i} review={review} />
      ))}
    </Container>
  );
};

export default ReviewFromGuest;
