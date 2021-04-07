import RoomCardSlider from "components/common/RoomCardSlider";
import AuthModal from "components/modal/authModal";
import WishlistModal from "components/modal/wishlistModal";
import useModal from "hooks/useModal";
import useRoom from "hooks/useRoom";
import useWishlist from "hooks/useWishlist";
import { useRouter } from "next/router";
import React from "react";
import {
  IoIosStar,
  IoMdHeart,
  IoMdHeartEmpty,
  IoIosArrowBack,
} from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";
import { useSelector } from "store";
import styled from "styled-components";
import palette from "styles/palette";
import { tabletSmallBreakpoint } from "styles/theme";

const Container = styled.div`
  .detail_mobile-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 24px;
  }
  .detail_mobile-photo-slider {
    width: 100%;
    padding-top: 56.25%;
    margin-top: 40px;
    > div {
      border-radius: 0;
      position: absolute;
      padding-top: 56.25%;
      top: 64px;
      left: 0;
      width: 100%;
    }
  }
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
  @media ${({ theme }) => theme.device.tabletSmall} {
    .detail_title,
    .detail_subtitle-container {
      padding: 0px 24px;
    }
    .detail_title {
      margin-top: 24px;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    .detail_mobile-photo-slider {
      padding-top: 66.66%;
      > div {
        padding-top: 66.66%;
      }
    }
  }
`;

const Title = () => {
  const innerWidth = useSelector((state) => state.common.innerWidth);
  const router = useRouter();
  const { query } = router;
  const { room } = useRoom();
  const { user, liked, handleItem } = useWishlist(query.id as string);
  const { openModal, closeModal, ModalPortal } = useModal();

  const handleClick = () => {
    handleItem();
    if (!liked) openModal();
  };

  if (!room) return null;
  return (
    <>
      <Container>
        {innerWidth < tabletSmallBreakpoint && (
          <>
            <div className="detail_mobile-header">
              <div onClick={() => router.back()}>
                <IoIosArrowBack size={24} />
              </div>
              <div onClick={handleClick}>
                {liked ? (
                  <IoMdHeart style={{ color: palette.bittersweet }} size={24} />
                ) : (
                  <IoMdHeartEmpty size={24} />
                )}
              </div>
            </div>
            <div className="detail_mobile-photo-slider">
              <RoomCardSlider>
                {room.photos.map((photo, i) => (
                  <img src={photo} alt="" key={i} />
                ))}
              </RoomCardSlider>
            </div>
          </>
        )}
        <div className="detail_title">{room.title}</div>
        <div className="detail_subtitle-container">
          <div className="detail_subtitle-container_left">
            <div className="detail_subtitle-container_rating">
              <IoIosStar size={16} />
              <span>{room.avgOfRating}</span>
              <span>({room.review.length})</span>
            </div>
            <span>·</span>
            <div className="detail_subtitle-container_address">
              {room.streetAddress}, {room.city}, {room.province}, {room.country}
            </div>
          </div>
          {innerWidth >= tabletSmallBreakpoint && (
            <div className="detail_subtitle-container_right">
              <div className="detail_small-button">
                <IoShareOutline size={18} />
                <span>공유하기</span>
              </div>
              <div className="detail_small-button" onClick={handleClick}>
                {liked ? (
                  <IoMdHeart style={{ color: palette.bittersweet }} size={18} />
                ) : (
                  <IoMdHeartEmpty size={18} />
                )}
                <span>{liked ? "저장됨" : "저장"}</span>
              </div>
            </div>
          )}
        </div>
        <ModalPortal>
          {!user?.isLoggedIn && <AuthModal closeModal={closeModal} />}
          {user?.isLoggedIn && <WishlistModal closeModal={closeModal} />}
        </ModalPortal>
      </Container>
    </>
  );
};

export default Title;
