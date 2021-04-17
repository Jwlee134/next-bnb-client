import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import palette from "styles/palette";

const Container = styled.div`
  width: 792px;
  height: 250px;
  display: flex;
  border-top: 1px solid ${palette.gray_eb};
  padding: 24px 0px;
  .room-card-skeleton_info-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .room-card-skeleton_info-container_top {
    display: flex;
    flex-direction: column;
  }
  .room-card-skeleton_info-container_bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  @media ${({ theme }) => theme.device.tabletSmall} {
    padding-top: 66.66%;
    height: 0;
    position: relative;
    > span {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      span {
        margin-right: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
`;

const RoomCardSkeleton = () => (
  <Container>
    <Skeleton width={300} height={200} style={{ marginRight: 12 }} />
    <div className="room-card-skeleton_info-container">
      <div className="room-card-skeleton_info-container_top">
        <Skeleton width={200} height={16.8} />
        <Skeleton width={400} height={24} />
        <Skeleton width={250} height={16.8} style={{ marginTop: 22 }} />
        <Skeleton width={300} height={16.8} />
      </div>
      <div className="room-card-skeleton_info-container_bottom">
        <Skeleton width={60} height={16.8} />
        <Skeleton width={110} height={32} />
      </div>
    </div>
  </Container>
);

export default RoomCardSkeleton;
