import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  > span {
    width: calc(33.3% - 21.33px);
    height: 300px;
    box-shadow: 0px 6px 16px rgb(0 0 0 / 12%);
    &:not(:last-child) {
      margin-right: 32px;
    }
    span {
      width: 100%;
      border-radius: 12px;
      height: 100%;
    }
  }
`;

const WishlistSkeleton = () => (
  <Container>
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </Container>
);

export default WishlistSkeleton;
