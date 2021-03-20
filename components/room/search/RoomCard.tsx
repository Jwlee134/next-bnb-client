import React, { useEffect, useState } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { IRoomDetail } from "types/room";
import Image from "next/image";
import { IoMdHeart, IoMdHeartEmpty, IoIosStar } from "react-icons/io";
import { FaWonSign } from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addComma } from "utils";
import { useRouter } from "next/router";
import { differenceInDays } from "date-fns";
import { useDispatch } from "react-redux";
import { roomActions } from "store/room";
import { useSelector } from "store";
import querystring from "querystring";
import RoomCardSlider from "./RoomCardSlider";
import useModal from "hooks/useModal";
import WishlistModal from "components/modal/wishlistModal";
import { wishlistActions } from "store/wishlist";

const Container = styled.div`
  width: 100%;
  height: 250px;
  border-top: 1px solid ${palette.gray_eb};
  padding: 24px 0px;
  display: flex;
  cursor: pointer;
  position: relative;
  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .room-card_image-container {
    width: 300px;
    min-width: 300px;
    height: 200px;
    border-radius: 7px;
    overflow: hidden;
    margin-right: 12px;
    background-color: ${palette.gray_eb};
  }
  .room-card_info-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .room-card_info-container_top {
      display: flex;
      justify-content: space-between;
      > div:first-child {
        margin-right: 5px;
        flex-grow: 1;
        .info-container_top_info-text {
          font-size: 14px;
          font-weight: 300;
          opacity: 0.8;
        }
        .info-container_top_title {
          font-size: 20px;
          margin-top: 3px;
          margin-bottom: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .room-card_divider {
          width: 50px;
          height: 1px;
          background-color: ${palette.gray_eb};
          margin: 7px 0px;
        }
      }
      > div:last-child {
        width: 25px;
        height: 25px;
        position: relative;
        ::after {
          position: absolute;
          content: "";
          border-radius: 50%;
          width: 37px;
          height: 37px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }
        &:hover {
          ::after {
            background-color: ${palette.gray_f7};
          }
        }
      }
    }
    .room-card_info-container_bottom {
      display: flex;
      justify-content: space-between;
      .info-container_bottom_rating {
        svg {
          color: ${palette.bittersweet};
          margin-right: 5px;
        }
        font-size: 14px;
        display: flex;
        align-items: flex-end;
        div {
          font-weight: bold;
          margin-right: 2px;
        }
        div:last-child {
          font-weight: 300;
          opacity: 0.7;
        }
      }
      .info-container_bottom_price {
        div:first-child {
          display: flex;
          font-weight: bold;
          align-items: center;
          svg {
            margin-right: 2px;
          }
          span {
            margin-left: 4px;
            font-weight: 400;
          }
        }
        div:last-child {
          font-weight: 300;
          text-decoration: underline;
          opacity: 0.7;
          font-size: 14px;
          text-align: right;
        }
      }
    }
  }
`;

const RoomCard = ({ room, index }: { room: IRoomDetail; index: number }) => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const search = useSelector((state) => state.search);
  const {
    query: { checkIn, checkOut },
  } = useRouter();
  const dispatch = useDispatch();
  const spaces = room.spaces.join(", ");

  const { openModal, closeModal, ModalPortal } = useModal();

  const [isLiked, setIsLiked] = useState(false);

  const handleWishlist = () => {
    if (!isLiked) {
      openModal();
      dispatch(wishlistActions.setClickedRoomId(room._id));
      return;
    }
    wishlist.forEach((list) => {
      if (!list.idList.some((id) => id === room._id)) return;
      const title = list.title;
      const id = room._id;
      dispatch(wishlistActions.deleteItem({ title, id }));
    });
    setIsLiked(false);
  };

  useEffect(() => {
    wishlist.forEach((list) => {
      if (list.idList.includes(room._id)) {
        setIsLiked(true);
      }
    });
  }, [wishlist]);

  const difference = differenceInDays(
    new Date(checkOut as string),
    new Date(checkIn as string)
  );

  const getRoomTypeText = () => {
    switch (room.roomType) {
      case "entire":
        return "집 전체";
      case "private":
        return "개인실";
      case "public":
        return "다인실";
      default:
        return "";
    }
  };

  return (
    <>
      <Container
        onMouseEnter={() => dispatch(roomActions.setHoveredItemIndex(index))}
        onMouseLeave={() => dispatch(roomActions.setHoveredItemIndex(null))}
      >
        <a
          href={`/room/${room._id}?${querystring.stringify(search)}`}
          target="_blank"
          rel="noreferrer"
        />
        <div className="room-card_image-container">
          <RoomCardSlider>
            {room.photos.map((photo, index) => (
              <Image key={index} src={photo} width={300} height={201} />
            ))}
          </RoomCardSlider>
        </div>
        <div className="room-card_info-container">
          <div className="room-card_info-container_top">
            <div>
              <div className="info-container_top_info-text">
                {room.city}의 {room.buildingType.label} {getRoomTypeText()}
              </div>
              <div className="info-container_top_title">{room.title}</div>
              <div className="room-card_divider" />
              <div className="info-container_top_info-text">
                최대 인원 {room.maximumGuestCount}명 · 침실 {room.bedroomCount}
                개 · 침대 {room.bedCount}개 · 욕실 {room.bathroomCount}개
              </div>
              <div className="info-container_top_info-text">{spaces}</div>
            </div>
            <div onClick={handleWishlist}>
              {isLiked ? (
                <IoMdHeart style={{ color: palette.bittersweet }} size={25} />
              ) : (
                <IoMdHeartEmpty size={25} />
              )}
            </div>
          </div>
          <div className="room-card_info-container_bottom">
            <div className="info-container_bottom_rating">
              <IoIosStar size={18} />
              <div>{room.rating}</div>
              <div>({room.review.length})</div>
            </div>
            {checkIn && checkOut && (
              <div className="info-container_bottom_price">
                <div>
                  <FaWonSign />
                  {addComma(String(room.price))} <span>/ 박</span>
                </div>
                <div>총액 ₩{addComma(String(room.price * difference))}</div>
              </div>
            )}
          </div>
        </div>
      </Container>
      <ModalPortal>
        <WishlistModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default RoomCard;
