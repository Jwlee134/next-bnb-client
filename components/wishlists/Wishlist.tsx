import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import Header from "components/header";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import { useRouter } from "next/router";
import { IWishlist } from "types/user";
import RoomCard from "components/common/RoomCard";
import { IRoomDetail } from "types/room";
import { IoArrowBackOutline, IoSettingsSharp } from "react-icons/io5";
import palette from "styles/palette";
import Link from "next/link";
import dynamic from "next/dynamic";
import useModal from "hooks/useModal";
import Setting from "components/modal/wishlistModal/Setting";
import { useSelector } from "store";
import { isEmpty } from "lodash";
import useGetWishlist from "hooks/useGetWishlist";
import { roomActions } from "store/room";
import { wishlistActions } from "store/wishlist";

const Map = dynamic(() => import("../common/Map"), { ssr: false });

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  .wishlist_room-card-container {
    width: 50%;
    padding: 24px;
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
`;

const Wishlist = () => {
  const router = useRouter();
  const { query } = router;

  const user = useSelector((state) => state.user.user);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const list = useSelector((state) => state.wishlist.list);
  const dispatch = useDispatch();

  const { openModal, closeModal, ModalPortal } = useModal();

  useGetWishlist();

  useEffect(() => {
    dispatch(commonActions.setShowMiniSearchBar(false));
    dispatch(commonActions.setShowSearchBar(false));
  }, []);

  useEffect(() => {
    if (isEmpty(wishlist)) return;
    dispatch(wishlistActions.setList(undefined));
    const data = wishlist.find((list) => list._id === (query.id as string));
    dispatch(wishlistActions.setList(data));
    if (data) {
      if (!user || user?._id !== data?.creator) {
        router.replace("/");
      }
    }
  }, [wishlist]);

  if (!list) {
    return (
      <>
        <Head>
          <title>숙소, 체험, 장소를 모두 한 곳에서 - 에어비앤비</title>
        </Head>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{list.title} · 위시리스트 · 에어비앤비</title>
      </Head>
      <Header useSearchBar={false} />
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
            <div>
              <IoSettingsSharp onClick={openModal} size={24} />
            </div>
          </div>
          <div className="wishlist_room-card-container_title">
            {list.title} · 숙소 {list.list.length}개
          </div>
          {list.list.map((item: IRoomDetail, i: number) => (
            <RoomCard key={i} room={item} index={i} />
          ))}
        </div>
        <div className="wishlist_map-container">
          <Map roomList={list.list} useFitBounds />
        </div>
      </Container>
      <ModalPortal>
        <Setting originTitle={list.title} closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default Wishlist;
