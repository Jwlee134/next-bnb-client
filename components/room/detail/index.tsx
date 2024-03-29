import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Error from "pages/_error";
import RoomDetailSkeleton from "components/skeleton/RoomDetailSkeleton";
import useRoom from "hooks/useRoom";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSelector } from "store";
import { tabletSmallBreakpoint } from "styles/theme";
import { commonActions } from "store/common";
import { useDispatch } from "react-redux";

import Photos from "./contents/Photos";
import BookingWindow from "./bookingWindow";
import Contents from "./contents";
import Title from "./title";
import MobileBookingButton from "./mobileOnly/MobileBookingButton";

const Rating = dynamic(() => import("./rating"));
const Map = dynamic(() => import("components/common/Map"), { ssr: false });

const Container = styled.div`
  > div {
    padding: 24px 80px;
    max-width: 1280px;
    margin: 0 auto;
    .detail_photo-container {
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: cover;
      }
    }
    .detail_main-container {
      padding-top: 40px;
      display: flex;
      .detail_main-container_left {
        width: 64%;
      }
      .detail_main-container_right {
        width: 36%;
        margin-left: 90px;
      }
    }
    .detail_content-title {
      font-size: 24px;
      font-weight: 500;
      padding-bottom: 24px;
    }
    .detail_map-container {
      padding: 48px 0px 24px 0px;
      .detail_map-container_address {
        padding-bottom: 24px;
        font-weight: 300;
      }
      > div {
        max-height: 480px;
      }
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    > div {
      padding: 24px;
    }
  }
  @media ${({ theme }) => theme.device.tabletSmall} {
    > div {
      padding: 24px 0px;
      .detail_content-title {
        margin-right: 12px;
      }
      .detail_main-container {
        padding: 0px 24px;
        display: block;
        padding-top: 0;
        .detail_main-container_left {
          width: 100%;
        }
      }
      .detail_content-room-info {
        margin-right: 12px;
      }
      .detail_map-container {
        padding: 48px 24px 64px 24px;
      }
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    .detail_content-title {
      div {
        font-size: 18px;
        font-weight: 500 !important;
      }
    }
    .detail_map-container {
      > div {
        max-height: 360px !important;
      }
    }
  }
`;

const RoomDetail = () => {
  const innerWidth = useSelector((state) => state.common.innerWidth);
  const dispatch = useDispatch();

  const { room, error } = useRoom({ useRedirect: true });
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    dispatch(commonActions.setShowMiniSearchBar(true));
    dispatch(commonActions.setShowSearchBar(false));
  }, [dispatch]);

  useEffect(() => {
    if (room) {
      const preloadImages = async () => {
        const photoArr = room.photos.slice(0, 5);

        const arr = await Promise.all(
          photoArr.map(async (photo, i) => {
            const img = new Image();
            img.src = photo;
            const index = await new Promise<number>((resolve) => {
              img.onload = () => {
                resolve(i);
              };
            });
            return index;
          })
        );

        if (arr.length === photoArr.length) {
          setImgLoaded(true);
        }
      };
      preloadImages();
    }
  }, [room]);

  if (error) {
    return (
      <Error statusCode={error.response.status} message={error.response.data} />
    );
  }

  if (!room || !imgLoaded) {
    return (
      <Container>
        <RoomDetailSkeleton />
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Head>
          <title>{room.title}</title>
        </Head>
        <div>
          <Title />
          {innerWidth >= tabletSmallBreakpoint && (
            <div className="detail_photo-container">
              <Photos photos={room.photos} />
            </div>
          )}
          <div className="detail_main-container">
            <div className="detail_main-container_left">
              <Contents />
            </div>
            {innerWidth >= tabletSmallBreakpoint && (
              <div className="detail_main-container_right">
                <BookingWindow />
              </div>
            )}
          </div>
          <Rating />
          <div className="detail_map-container">
            <div className="detail_content-title">위치</div>
            <div className="detail_map-container_address">
              {room.streetAddress}, {room.city}, {room.province}, {room.country}
            </div>
            <Map
              room={room}
              useFitBounds
              useInteractiveMarker={false}
              gestureHandling="auto"
            />
          </div>
        </div>
        {innerWidth < tabletSmallBreakpoint && <MobileBookingButton />}
      </Container>
    </>
  );
};

export default RoomDetail;
