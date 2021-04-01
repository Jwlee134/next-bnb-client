import ReviewCard from "components/common/ReviewCard";
import React from "react";
import styled from "styled-components";
import { IReview } from "types/review";
import { IUser } from "types/user";

const Container = styled.div``;

const ReviewFromHost = ({ user }: { user: IUser }) => {
  return (
    <Container>
      {user.reviewFromHost.map((review: IReview, i: number) => (
        <ReviewCard key={i} review={review} />
      ))}
    </Container>
  );
};

export default ReviewFromHost;
