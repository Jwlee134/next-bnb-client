import React, { useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
import { IRoomDetail } from "types/room";
import Header from "components/header";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";
import Error from "pages/_error";
import RoomDetailSkeleton from "components/common/RoomDetailSkeleton";
import { IoIosStar, IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";
import palette from "styles/palette";
import { isEmpty } from "lodash";
import { roomActions } from "store/room";
import querystring from "querystring";
import { deleteIdFromQuery } from "utils";
import useModal from "hooks/useModal";
import WishlistModal from "components/modal/wishlistModal";
import useWishlist from "hooks/useWishlist";
import { useSelector } from "store";
import AuthModal from "components/modal/authModal";
import Bed from "../../../public/static/svg/room/bed.svg";
import Photos from "./Photos";
import Amenity from "./Amenity";
import BookingWindow from "./BookingWindow";

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  @media screen and (max-width: 1023px) {
    > div {
      padding: 24px 24px !important;
    }
  }
  > div {
    padding: 24px 80px;
    max-width: 1280px;
    margin: 0 auto;
    .detail_title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .detail_subtitle-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .detail_subtitle-container_left {
        display: flex;
        align-items: center;
        font-size: 14px;
        > span {
          margin: 0px 6px;
        }
        .detail_subtitle-container_rating {
          display: flex;
          align-items: center;
          svg {
            color: ${palette.bittersweet};
            margin-right: 5px;
            margin-bottom: 3px;
          }
          span {
            font-weight: bold;
          }
          span:last-child {
            margin-left: 3px;
            font-weight: 300;
            opacity: 0.7;
          }
        }
        .detail_subtitle-container_address {
          font-weight: 500;
          opacity: 0.7;
        }
      }
      .detail_subtitle-container_right {
        display: flex;
        .detail_small-button {
          display: flex;
          align-items: center;
          cursor: pointer;
          border-radius: 5px;
          padding: 7px 10px;
          font-size: 15px;
          font-weight: 500;
          svg {
            margin-right: 5px;
          }
          &:hover {
            background-color: ${palette.gray_f7};
          }
          span {
            text-decoration: underline;
          }
        }
      }
    }
    .detail_photo-container {
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
    .detail_main-container {
      padding-top: 40px;
      display: flex;
      .detail_main-container_left {
        width: 64%;
        .main-container_left_title_avatar-url {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid ${palette.gray_dd};
          padding-bottom: 24px;
          div {
            div:first-child {
              font-size: 24px;
              font-weight: 500;
              margin-bottom: 5px;
            }
            div:last-child {
              font-weight: 300;
            }
          }
          img {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            cursor: pointer;
          }
        }
        .main-container_left_description {
          padding: 24px 0px;
          border-bottom: 1px solid ${palette.gray_dd};
          line-height: 1.5;
          font-weight: 300;
          white-space: pre-wrap;
        }
        .main-container_left_bed-type {
          padding: 48px 0px 24px 0px;
          border-bottom: 1px solid ${palette.gray_dd};
          > div:first-child {
            font-size: 24px;
            font-weight: 500;
            padding-bottom: 24px;
          }
          > div:last-child {
            display: flex;
            flex-wrap: wrap;
            .bed-type_container {
              border: 1px solid ${palette.gray_dd};
              border-radius: 12px;
              padding: 24px;
              width: calc(33% - 16px);
              margin-right: 24px;
              margin-bottom: 24px;
              &:nth-child(3n) {
                margin-right: 0;
              }
              svg {
                margin-bottom: 12px;
              }
              div:last-child {
                font-size: 15px;
                margin-top: 6px;
                font-weight: 300;
              }
            }
          }
        }
        .main-container_left_amenities {
          padding: 48px 0px 36px 0px;
          border-bottom: 1px solid ${palette.gray_dd};
          > div:first-child {
            font-size: 24px;
            font-weight: 500;
            padding-bottom: 24px;
          }
          > div:last-child {
            display: flex;
            flex-wrap: wrap;
          }
        }
      }
      .detail_main-container_right {
        width: 36%;
        margin-left: 90px;
      }
    }
  }
`;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const RoomDetail = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const router = useRouter();
  const { query } = router;
  const { data, error } = useSWR<IRoomDetail, Error>(
    `/api/room/detail?id=${query.id}`,
    fetcher
  );
  const dispatch = useDispatch();

  const { openModal, closeModal, ModalPortal } = useModal();

  const { isLiked, handleWishlist } = useWishlist(query.id as string);

  const handleClick = () => {
    handleWishlist();
    if (!isLiked) openModal();
  };

  useEffect(() => {
    dispatch(commonActions.setShowMiniSearchBar(true));
    dispatch(commonActions.setShowSearchBar(false));
    if (Number(query.adults) < 1) {
      router.push(
        `/room/${query.id}?${querystring.stringify(
          deleteIdFromQuery({ ...query, adults: "1" })
        )}`
      );
    }
    if (Number(query.children) < 0) {
      router.push(
        `/room/${query.id}?${querystring.stringify(
          deleteIdFromQuery({ ...query, children: "0" })
        )}`
      );
    }
    if (Number(query.infants) < 0) {
      router.push(
        `/room/${query.id}?${querystring.stringify(
          deleteIdFromQuery({ ...query, infants: "0" })
        )}`
      );
    }
  }, []);

  useEffect(() => {
    if (data) dispatch(roomActions.setRoom(data));
  }, [data]);

  const getRoomTypeText = () => {
    switch (data?.roomType) {
      case "entire":
        return "전체";
      case "private":
        return "개인실";
      case "public":
        return "다인실";
      default:
        return "";
    }
  };

  const bedTypeCount = (i: number) =>
    data?.bedType[i].beds
      .map((bed) => `${bed.label} ${bed.count}개`)
      .join(", ");

  const publicBedTypeCount = () =>
    data?.publicBedType.map((bed) => `${bed.label} ${bed.count}개`).join(", ");

  if (!query.id || error) return <Error statusCode={404} />;
  if (!data) {
    return (
      <>
        <Head>
          <title>숙소, 체험, 장소를 모두 한 곳에서 - 에어비앤비</title>
        </Head>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Container>
          <RoomDetailSkeleton />
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <Container>
        <div>
          <div className="detail_title">{data.title}</div>
          <div className="detail_subtitle-container">
            <div className="detail_subtitle-container_left">
              <div className="detail_subtitle-container_rating">
                <IoIosStar size={16} />
                <span>{data.rating}</span>
                <span>({data.review.length})</span>
              </div>
              <span>·</span>
              <div className="detail_subtitle-container_address">
                {data.streetAddress}, {data.city}, {data.province},{" "}
                {data.country}
              </div>
            </div>
            <div className="detail_subtitle-container_right">
              <div className="detail_small-button">
                <IoShareOutline size={18} />
                <span>공유하기</span>
              </div>
              <div className="detail_small-button" onClick={handleClick}>
                {isLiked ? (
                  <IoMdHeart style={{ color: palette.bittersweet }} size={18} />
                ) : (
                  <IoMdHeartEmpty size={18} />
                )}
                <span>{isLiked ? "저장됨" : "저장"}</span>
              </div>
            </div>
          </div>
          <div className="detail_photo-container">
            <Photos photos={data.photos} />
          </div>
          <div className="detail_main-container">
            <div className="detail_main-container_left">
              <div className="main-container_left_title_avatar-url">
                <div>
                  <div>
                    {data.creator.name}님이 호스팅하는{" "}
                    {data.largeBuildingType.label} {getRoomTypeText()}
                  </div>
                  <div>
                    최대 인원 {data.maximumGuestCount}명 · 침실{" "}
                    {data.bedroomCount}개 · 침대 {data.bedCount}개 · 욕실{" "}
                    {data.bathroomCount}개
                  </div>
                </div>
                <img src={data.creator.avatarUrl} alt="" />
              </div>
              <pre className="main-container_left_description">
                {data.description}
              </pre>
              <div className="main-container_left_bed-type">
                <div>침대/침구 유형</div>
                <div>
                  {data.bedType.map((bedroom, i) => (
                    <div className="bed-type_container" key={i}>
                      <div>
                        <Bed />
                      </div>
                      <div>{bedroom.id}번 침실</div>
                      <div>{bedTypeCount(i)}</div>
                    </div>
                  ))}
                  {data.publicBedType.map((_, i) => (
                    <div className="bed-type_container" key={i}>
                      <div>
                        <Bed />
                      </div>
                      <div>공용 공간</div>
                      <div>{publicBedTypeCount()}</div>
                    </div>
                  ))}
                </div>
              </div>
              {!isEmpty(data.amenities) && (
                <div className="main-container_left_amenities">
                  <div>편의시설</div>
                  <div>
                    {data.amenities.map((amenity, i) => (
                      <Amenity amenity={amenity} key={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="detail_main-container_right">
              <BookingWindow />
            </div>
          </div>
        </div>
      </Container>
      <ModalPortal>
        {!isLoggedIn && <AuthModal closeModal={closeModal} />}
        {isLoggedIn && <WishlistModal closeModal={closeModal} />}
      </ModalPortal>
    </>
  );
};

export default RoomDetail;
