import AuthModal from "components/modal/authModal";
import WishlistModal from "components/modal/wishlistModal";
import useModal from "hooks/useModal";
import useRoom from "hooks/useRoom";
import useWishlist from "hooks/useWishlist";
import { useRouter } from "next/router";
import React from "react";
import { IoIosStar, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div`
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
`;

const Title = () => {
  const { query } = useRouter();
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
