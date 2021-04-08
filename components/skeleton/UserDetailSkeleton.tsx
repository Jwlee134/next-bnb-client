import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  .user-detail-skeleton_avatar {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    margin-right: 24px;
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .user-detail-skeleton_name {
    width: 400px;
    height: 40px;
  }
  .user-detail-skeleton_year {
    width: 125px;
    height: 20px;
    margin-top: 10px;
    display: block;
  }
  @media ${({ theme }) => theme.device.tabletSmall} {
    margin-top: 64px;
    .user-detail-skeleton_name {
      width: 200px;
      height: 60px;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    .user-detail-skeleton_avatar {
      width: 64px;
      height: 64px;
    }
    .user-detail-skeleton_name {
      width: 160px;
      height: 40px;
    }
  }
`;

const UserDetailSkeleton = () => (
  <Container>
    <Skeleton className="user-detail-skeleton_avatar" />
    <div>
      <Skeleton className="user-detail-skeleton_name" />
      <Skeleton className="user-detail-skeleton_year" />
    </div>
  </Container>
);

export default UserDetailSkeleton;
