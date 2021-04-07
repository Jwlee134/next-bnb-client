import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Container = styled.div`
  div:first-child {
    width: 100%;
    position: relative;
    padding-top: 66.66%;
    border-radius: 10px;
    overflow: hidden;
    > span {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      span {
        height: 100%;
      }
    }
  }
  div:last-child {
    margin-top: 2.5px;
    display: flex;
    flex-direction: column;
    span {
      display: block;
      margin: 2.5px 0px;
    }
  }
`;

const SmallRoomCardSkeleton = () => (
  <Container>
    <div>
      <Skeleton />
    </div>
    <div>
      <Skeleton width={50} />
      <Skeleton width={150} />
      <Skeleton width={150} />
      <Skeleton width={100} />
    </div>
  </Container>
);

export default SmallRoomCardSkeleton;
