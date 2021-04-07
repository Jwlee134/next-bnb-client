import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "store";
import { tabletSmallBreakpoint } from "styles/theme";

const Container = styled.div`
  .room-card-skeleton_title-container {
    display: flex;
    flex-direction: column;
    > span:last-child {
      margin-top: 12px;
      margin-bottom: 24px;
    }
  }
  .room-card-skeleton_photo-container {
    width: 100%;
    display: flex;
  }
  .room-card-skeleton_photo-container_first-photo {
    width: 50%;
    height: 400px;
    span {
      border-top-left-radius: 14px;
      border-bottom-left-radius: 14px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  }
  .room-card-skeleton_photo-container_rest-photos {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    height: 400px;
    padding-left: 8px;
  }
  .room-detail-skeleton_mobile-photo {
    width: 100%;
    margin-top: 48px;
    padding-top: 56.25%;
    position: relative;
    height: 0;
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
  .room-card-skeleton_photo-container_rest-photos_block {
    width: calc(50% - 4px);
    height: calc(50% - 4px);
    overflow: hidden;
    &:first-child {
      margin-bottom: 8px;
      margin-right: 8px;
    }
    &:nth-child(3) {
      margin-right: 8px;
    }
    span {
      border-radius: 0;
    }
    &:nth-child(2) {
      border-top-right-radius: 14px;
    }
    &:last-child {
      border-bottom-right-radius: 14px;
    }
  }
  .room-card-skeleton_bottom-container {
    margin-top: 48px;
    display: flex;
  }
  .room-detail-skeleton_mobile-contents {
    padding: 24px;
    display: flex;
    flex-direction: column;
    span {
      display: block;
      margin-bottom: 5px;
    }
  }
  .room-card-skeleton_bottom-container_left {
    width: 64%;
    display: flex;
    justify-content: space-between;
  }
  .room-card-skeleton_bottom-container_left_text-container {
    display: flex;
    flex-direction: column;
    > span:first-child {
      margin-bottom: 8px;
    }
  }
  .room-detail-skeleton_avatar-container {
    span {
      border-radius: 50%;
    }
  }
  .room-card-skeleton_bottom-container_right {
    width: 36%;
    margin-left: 90px;
    span:first-child {
      margin-bottom: 16px;
    }
  }
  .room-detail-skeleton_mobile-contents_flex-container {
    display: flex;
    justify-content: space-between;
  }
  @media ${({ theme }) => theme.device.mobile} {
    .room-detail-skeleton_mobile-photo {
      padding-top: 66.66%;
    }
    .room-detail-skeleton_mobile-contents_flex-container {
      > div:first-child {
        > span:first-child {
          span {
            width: 120px !important;
          }
        }
        > span:last-child {
          span {
            width: 160px !important;
          }
        }
      }
    }
  }
`;

const RoomDetailSkeleton = () => {
  const innerWidth = useSelector((state) => state.common.innerWidth);
  if (!innerWidth) return null;
  return (
    <Container>
      {innerWidth >= tabletSmallBreakpoint ? (
        <>
          <div className="room-card-skeleton_title-container">
            <Skeleton width={480} height={30} />
            <Skeleton width={320} height={20} />
          </div>
          <div className="room-card-skeleton_photo-container">
            <div className="room-card-skeleton_photo-container_first-photo">
              <Skeleton width="100%" height="100%" />
            </div>
            <div className="room-card-skeleton_photo-container_rest-photos">
              <div className="room-card-skeleton_photo-container_rest-photos_block">
                <Skeleton width="100%" height="100%" />
              </div>
              <div className="room-card-skeleton_photo-container_rest-photos_block">
                <Skeleton width="100%" height="100%" />
              </div>
              <div className="room-card-skeleton_photo-container_rest-photos_block">
                <Skeleton width="100%" height="100%" />
              </div>
              <div className="room-card-skeleton_photo-container_rest-photos_block">
                <Skeleton width="100%" height="100%" />
              </div>
            </div>
          </div>
          <div className="room-card-skeleton_bottom-container">
            <div className="room-card-skeleton_bottom-container_left">
              <div className="room-card-skeleton_bottom-container_left_text-container">
                <Skeleton width={360} height={24} />
                <Skeleton width={120} height={16} />
              </div>
              <div className="room-detail-skeleton_avatar-container">
                <Skeleton width={56} height={56} />
              </div>
            </div>
            <div className="room-card-skeleton_bottom-container_right">
              <Skeleton width={128} height={32} />
              <Skeleton width="100%" height={48} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="room-detail-skeleton_mobile-photo">
            <Skeleton />
          </div>
          <div className="room-detail-skeleton_mobile-contents">
            <Skeleton width={180} height={30} />
            <Skeleton width={250} height={20} />
            <div className="room-detail-skeleton_mobile-contents_flex-container">
              <div>
                <Skeleton width={300} height={30} />
                <Skeleton width={230} height={20} />
              </div>
              <div className="room-detail-skeleton_avatar-container">
                <Skeleton width={56} height={56} />
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default RoomDetailSkeleton;
