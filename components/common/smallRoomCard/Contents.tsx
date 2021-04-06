import { differenceInDays } from "date-fns";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { FaWonSign } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { useDispatch } from "react-redux";
import { roomActions } from "store/room";
import styled from "styled-components";
import palette from "styles/palette";
import { IRoom } from "types/room";
import { addComma, getRoomTypeText } from "utils";
import RoomCardSlider from "../RoomCardSlider";

const Container = styled.div<{ isSearchPage: boolean }>`
  width: 100%;
  padding: ${({ isSearchPage }) =>
    isSearchPage ? "0px 0px 24px 0px" : "0px 10px"};
  > div:first-child {
    position: relative;
    padding-top: 66.66%;
    height: 0;
    border-radius: 10px;
    overflow: hidden;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }
  .small-room-card_text-container {
    margin-top: 12px;
    .small-room-card_text-container_rating {
      display: flex;
      align-items: center;
      font-weight: 300;
      font-size: 14px;
      margin-bottom: 6px;
      span:last-child {
        opacity: 0.7;
        margin-left: 3px;
      }
      svg {
        color: ${palette.bittersweet};
        margin-right: 5px;
        margin-bottom: 2px;
      }
    }
    .small-room-card_text-container_room {
      > div {
        font-weight: 300;
        font-size: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:first-child {
          margin-bottom: 5px;
        }
        &:nth-child(2) {
          font-size: 18px;
        }
      }
      .text-container_room-price {
        margin-top: 5px;
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
        }
      }
    }
  }
`;

const Contents = ({
  isSearchPage,
  room,
  useSlider,
  index,
  showPriceWIthoutDates,
}: {
  room: IRoom;
  isSearchPage: boolean;
  useSlider: boolean;
  index?: number;
  showPriceWIthoutDates: boolean;
}) => {
  const {
    query: { checkIn, checkOut },
  } = useRouter();
  const dispatch = useDispatch();

  const difference = differenceInDays(
    new Date(checkOut as string),
    new Date(checkIn as string)
  );

  return (
    <Container
      className="contents_container"
      isSearchPage={isSearchPage}
      onMouseEnter={() => {
        if (index === undefined) return;
        dispatch(roomActions.setHoveredItemIndex(index));
      }}
      onMouseLeave={() => {
        if (index === undefined) return;
        dispatch(roomActions.setHoveredItemIndex(null));
      }}
    >
      {!useSlider && (
        <div>
          <img src={room.photos[0]} alt="" />
        </div>
      )}
      {useSlider && (
        <RoomCardSlider>
          {room.photos.map((photo, i) => (
            <img src={photo} key={i} alt="" />
          ))}
        </RoomCardSlider>
      )}
      <div className="small-room-card_text-container">
        {!isEmpty(room.review) && (
          <div className="small-room-card_text-container_rating">
            <IoIosStar size={18} />
            <span>{room.avgOfRating}</span>
            <span>({room.review.length})</span>
          </div>
        )}
        <div className="small-room-card_text-container_room">
          <div>
            {getRoomTypeText(room)} · {room.buildingType.label} · {room.city}
          </div>
          <div>{room.title}</div>
          {checkIn && checkOut && (
            <div className="text-container_room-price">
              <div>
                <FaWonSign />
                {addComma(String(room.price))} <span>/ 박</span>
              </div>
              <div>총액 ₩{addComma(String(room.price * difference))}</div>
            </div>
          )}
          {showPriceWIthoutDates && (
            <div className="text-container_room-price">
              <div>
                <FaWonSign />
                {addComma(String(room.price))} <span>/ 박</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Contents;
