import React from "react";
import { IoIosStar } from "react-icons/io";
import styled from "styled-components";
import palette from "styles/palette";
import { IRoom } from "types/room";
import querystring from "querystring";
import { SearchState } from "store/search";
import { FaWonSign } from "react-icons/fa";
import { addComma, getRoomTypeText } from "utils";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slickStyles } from "styles/slick";

const Container = styled.div`
  ${slickStyles};
  width: 250px;
  overflow: hidden;
  font-family: Noto Sans KR;
  &:hover {
    .slick-arrow {
      display: block !important;
    }
  }
  img {
    width: 100%;
    height: 167px;
  }
  .info-window_img-container {
    background-color: ${palette.gray_eb};
    max-height: 167px;
  }
  .info-window_text-container {
    padding: 8px;
  }
  .info-window_text-title {
    font-size: 16px;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .info-window_flex-container {
    display: flex;
    justify-content: space-between;
    > div {
      font-size: 12px;
    }
  }
  .info-window_flex-container_rating {
    svg {
      color: ${palette.bittersweet};
      margin-right: 3px;
      margin-bottom: 2px;
    }
    font-size: 14px;
    display: flex;
    align-items: flex-end;
  }
  .info-window_flex-container_rating-score {
    margin-right: 2px;
  }
  .info-window_flex-container_rating-count {
    font-weight: 300;
    opacity: 0.7;
  }
  .info-window_flex-container_price {
    display: flex;
    font-weight: bold;
    align-items: center;
    svg {
      margin-right: 2px;
      margin-top: 1px;
    }
    span {
      margin-left: 4px;
      font-weight: 300;
    }
  }
`;

const InfoWindow = ({ room, search }: { room: IRoom; search: SearchState }) => {
  const { checkIn, checkOut } = search;

  return (
    <a
      href={`/room/${room._id}?${querystring.stringify(search)}`}
      target="_blank"
      rel="noreferrer"
    >
      <Container>
        <div className="info-window_img-container">
          <Slider slidesToScroll={1} slidesToShow={1} infinite={true}>
            {room.photos.map((photo, index) => (
              <img key={index} src={photo} alt="" />
            ))}
          </Slider>
        </div>
        <div className="info-window_text-container">
          <div className="info-window_text-title">{room.title}</div>
          <div>
            {room.buildingType.label} {getRoomTypeText(room)}
          </div>
          <div className="info-window_flex-container">
            <div className="info-window_flex-container_rating">
              <IoIosStar size={14} />
              <div className="info-window_flex-container_rating-score">
                {room.avgOfRating}
              </div>
              <div className="info-window_flex-container_rating-count">
                ({room.review.length})
              </div>
            </div>
            {checkIn && checkOut && (
              <div className="info-window_flex-container_price">
                <FaWonSign />
                {addComma(String(room.price))} <span>/ 박</span>
              </div>
            )}
            {!checkIn && !checkOut && <div>날짜를 입력하여 가격 확인</div>}
          </div>
        </div>
      </Container>
    </a>
  );
};

export default InfoWindow;
