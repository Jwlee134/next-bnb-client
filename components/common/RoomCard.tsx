import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { IRoom } from "types/room";
import { IoMdHeart, IoMdHeartEmpty, IoIosStar } from "react-icons/io";
import { FaWonSign } from "react-icons/fa";

import { addComma, getRoomTypeText, makeQueryString } from "utils";
import { useRouter } from "next/router";
import { differenceInDays } from "date-fns";
import { useDispatch } from "react-redux";
import { roomActions } from "store/room";
import { useSelector } from "store";
import useModal from "hooks/useModal";
import WishlistModal from "components/modal/wishlistModal";
import useWishlist from "hooks/useWishlist";
import AuthModal from "components/modal/authModal";
import RoomCardSlider from "./RoomCardSlider";

const WishlistButton = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 18px;
  right: -6px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${palette.gray_f7};
  }
`;

const Container = styled.div`
  &:hover {
    .slick-arrow {
      display: block !important;
    }
  }
  width: 100%;
  height: 250px;
  border-top: 1px solid ${palette.gray_eb};
  display: flex;
  cursor: pointer;
  position: relative;
  a {
    display: flex;
    width: 100%;
    padding: 24px 0px;
  }
  .room-card_image-container {
    width: 300px;
    min-width: 300px;
    height: 200px;
    border-radius: 7px;
    overflow: hidden;
    margin-right: 12px;
    background-color: ${palette.gray_eb};
    img {
      width: 300px;
      height: 200px;
      object-fit: cover;
    }
  }
  .room-card_info-container {
    flex-grow: 1;
    max-width: calc(100% - 300px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .room-card_info-container_top {
      display: flex;
      justify-content: space-between;
      > div:first-child {
        max-width: calc(100% - 45px);
        flex-grow: 1;
        .info-container_top_info-text {
          font-size: 14px;
          font-weight: 300;
          opacity: 0.8;
        }
        .info-container_top_title {
          width: 100%;
          font-size: 20px;
          margin-top: 3px;
          margin-bottom: 8px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: block;
        }
        .room-card_divider {
          width: 50px;
          height: 1px;
          background-color: ${palette.gray_eb};
          margin: 7px 0px;
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

const RoomCard = ({
  room,
  index,
  showPriceWIthoutDates = false,
}: {
  room: IRoom;
  index: number;
  showPriceWIthoutDates?: boolean;
}) => {
  const { user, liked, handleItem } = useWishlist(room._id);

  const search = useSelector((state) => state.search);
  const {
    query: { checkIn, checkOut },
  } = useRouter();
  const dispatch = useDispatch();
  const spaces = room.spaces.join(", ");

  const { openModal, closeModal, ModalPortal } = useModal();

  const handleClick = async () => {
    await handleItem();
    if (!liked) return openModal();
  };

  const difference = differenceInDays(
    new Date(checkOut as string),
    new Date(checkIn as string)
  );

  return (
    <Container
      onMouseEnter={() => dispatch(roomActions.setHoveredItemIndex(index))}
      onMouseLeave={() => dispatch(roomActions.setHoveredItemIndex(null))}
    >
      <a
        href={`/room/${room._id}${makeQueryString({
          ...search,
          value: "",
          latitude: 0,
          longitude: 0,
          children: search.children === 0 ? "0" : search.children,
          infants: search.infants === 0 ? "0" : search.infants,
        })}`}
        target="_blank"
        rel="noreferrer"
      >
        <div className="room-card_image-container">
          <RoomCardSlider>
            {room.photos.map((photo, index) => (
              <img key={index} src={photo} alt="" />
            ))}
          </RoomCardSlider>
        </div>
        <div className="room-card_info-container">
          <div className="room-card_info-container_top">
            <div>
              <div className="info-container_top_info-text">
                {room.city}의 {room.buildingType.label} {getRoomTypeText(room)}
              </div>
              <div className="info-container_top_title">{room.title}</div>
              <div className="room-card_divider" />
              <div className="info-container_top_info-text">
                최대 인원 {room.maximumGuestCount}명 · 침실 {room.bedroomCount}
                개 · 침대 {room.bedCount}개 · 욕실 {room.bathroomCount}개
              </div>
              <div className="info-container_top_info-text">{spaces}</div>
            </div>
          </div>
          <div className="room-card_info-container_bottom">
            <div className="info-container_bottom_rating">
              <IoIosStar size={18} />
              <div>{room.avgOfRating}</div>
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
            {showPriceWIthoutDates && (
              <div className="info-container_bottom_price">
                <div>
                  <FaWonSign />
                  {addComma(String(room.price))} <span>/ 박</span>
                </div>
                <div />
              </div>
            )}
          </div>
        </div>
      </a>
      <WishlistButton onClick={handleClick}>
        {liked ? (
          <IoMdHeart style={{ color: palette.bittersweet }} size={25} />
        ) : (
          <IoMdHeartEmpty size={25} />
        )}
      </WishlistButton>
      <ModalPortal>
        {!user?.isLoggedIn && <AuthModal closeModal={closeModal} />}
        {user?.isLoggedIn && <WishlistModal closeModal={closeModal} />}
      </ModalPortal>
    </Container>
  );
};

export default RoomCard;
