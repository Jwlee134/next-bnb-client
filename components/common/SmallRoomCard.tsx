import { isEmpty } from "lodash";
import React from "react";
import { IoIosStar } from "react-icons/io";
import styled from "styled-components";
import palette from "styles/palette";
import { IRoom } from "types/room";
import { getRoomTypeText } from "utils";

const Container = styled.div`
  width: 100%;
  padding: 0px 10px;
  > div:first-child {
    position: relative;
    padding-top: 66.66%;
    height: 0;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
      border-radius: 10px;
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
      div {
        font-weight: 300;
        font-size: 15px;
        &:first-child {
          margin-bottom: 6px;
        }
      }
    }
  }
`;

const SmallRoomCard = ({ room }: { room: IRoom }) => {
  return (
    <a
      href={`/room/${room._id}?adults=1&children=0&infants=0`}
      target="_blank"
      rel="noreferrer"
    >
      <Container>
        <div>
          <img src={room.photos[0]} alt="" />
        </div>
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
              {getRoomTypeText(room)} · {room.buildingType.label}
            </div>
            <div>{room.title}</div>
          </div>
        </div>
      </Container>
    </a>
  );
};

export default SmallRoomCard;
