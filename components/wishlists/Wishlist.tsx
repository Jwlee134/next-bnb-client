import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import RoomCard from "components/common/RoomCard";
import { IRoom } from "types/room";
import { IoArrowBackOutline, IoSettingsSharp } from "react-icons/io5";
import palette from "styles/palette";
import Link from "next/link";
import dynamic from "next/dynamic";
import useModal from "hooks/useModal";
import Setting from "components/modal/wishlistModal/Setting";
import { isEmpty } from "lodash";
import useWishlist from "hooks/useWishlist";
import { IWishlist } from "types/user";
import RoomCardSkeleton from "components/skeleton/RoomCardSkeleton";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "store";
import { pcSmallBreakpoint, tabletSmallBreakpoint } from "styles/theme";
import SmallRoomCard from "components/common/smallRoomCard";
import SmallRoomCardSkeleton from "components/skeleton/SmallRoomCardSkeleton";

const Map = dynamic(() => import("../common/Map"), { ssr: false });

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  .wishlist_room-card-container {
    max-width: 840px;
    padding: 24px;
    .wishlist_flex-container {
      > a {
        margin-bottom: 20px;
      }
    }
    .wishlist_room-card-container_buttons {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      svg {
        cursor: pointer;
      }
      div {
        position: relative;
        height: 24px;
        ::after {
          width: 40px;
          height: 40px;
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          border-radius: 50%;
        }
        &:hover {
          ::after {
            background-color: ${palette.gray_f7};
          }
        }
      }
    }
    .wishlist_room-card-container_title {
      font-size: 30px;
      font-weight: 500;
      margin: 12px 0px;
    }
  }
  .wishlist_map-container {
    width: 50%;
  }
  .contents_container {
    padding: 0 !important;
  }
  @media ${({ theme }) => theme.device.pcSmall} {
    .wishlist_room-card-container {
      width: 50%;
      max-width: 50%;
      .wishlist_flex-container {
        > a {
          > div {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
  @media ${({ theme }) => theme.device.tabletSmall} {
    .wishlist_room-card-container {
      width: 100%;
      max-width: 100%;
      padding-bottom: 64px;
      .wishlist_flex-container {
        display: block !important;
        > a {
          width: 100% !important;
        }
      }
    }
  }
`;

const Wishlist = () => {
  const innerWidth = useSelector((state) => state.common.innerWidth);
  const router = useRouter();
  const { query } = router;

  const { user, wishlist } = useWishlist();

  const { openModal, closeModal, ModalPortal } = useModal();

  const [data, setData] = useState<IWishlist>();

  useEffect(() => {
    if (!wishlist || isEmpty(wishlist) || !query.id) return;
    const data = wishlist.find((list) => list._id === (query.id as string));
    setData(data);
  }, [wishlist, query]);

  if (!data) {
    return (
      <Container>
        <div className="wishlist_room-card-container">
          <div className="wishlist_room-card-container_title">
            <Skeleton width={200} height={36} />
          </div>
          {innerWidth && innerWidth >= pcSmallBreakpoint ? (
            <RoomCardSkeleton />
          ) : (
            <SmallRoomCardSkeleton />
          )}
        </div>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{data.title} · 위시리스트 · 에어비앤비</title>
      </Head>
      <Container>
        <div className="wishlist_room-card-container">
          <div className="wishlist_room-card-container_buttons">
            <div>
              <Link href="/wishlists">
                <a>
                  <IoArrowBackOutline size={24} />
                </a>
              </Link>
            </div>
            {data.creator === user?._id && (
              <div>
                <IoSettingsSharp onClick={openModal} size={24} />
              </div>
            )}
          </div>
          <div className="wishlist_room-card-container_title">
            {data.title} · 숙소 {data.list.length}개
          </div>
          <div className="wishlist_flex-container">
            {innerWidth >= pcSmallBreakpoint
              ? data.list.map((item: IRoom, i: number) => (
                  // eslint-disable-next-line react/jsx-indent
                  <RoomCard
                    key={item._id}
                    room={item}
                    index={i}
                    showPriceWIthoutDates
                  />
                ))
              : data.list.map((item: IRoom, i: number) => (
                  // eslint-disable-next-line react/jsx-indent
                  <SmallRoomCard
                    key={item._id}
                    index={innerWidth >= tabletSmallBreakpoint ? i : undefined}
                    room={item}
                    useSlider
                    showPriceWIthoutDates
                    isMobile={innerWidth < tabletSmallBreakpoint}
                  />
                ))}
          </div>
        </div>
        {innerWidth >= tabletSmallBreakpoint && (
          <div className="wishlist_map-container">
            <Map roomList={data.list} useFitBounds />
          </div>
        )}
      </Container>
      <ModalPortal>
        <Setting originTitle={data.title} closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default Wishlist;
