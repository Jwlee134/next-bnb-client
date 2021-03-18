import Image from "next/image";
import React from "react";
import { IoIosStar } from "react-icons/io";
import styled from "styled-components";
import palette from "styles/palette";
import { IRoomDetail } from "types/room";
import querystring from "querystring";
import { FaWonSign } from "react-icons/fa";
import { addComma } from "utils";
import RoomCardSlider from "./RoomCardSlider";

const Container = styled.div`
  width: 250px;
  overflow: hidden;
  font-family: Noto Sans KR;
`;

const ImageContainer = styled.div`
  background-color: ${palette.gray_eb};
  max-height: 167px;
`;

const TextContainer = styled.div`
  padding: 8px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Rating = styled.div`
  svg {
    color: ${palette.bittersweet};
    margin-right: 3px;
    margin-bottom: 2px;
  }
  font-size: 14px;
  display: flex;
  align-items: flex-end;
`;

const Score = styled.span`
  margin-right: 2px;
`;

const RatingCount = styled.span`
  font-weight: 300;
  opacity: 0.7;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    font-size: 12px;
  }
`;

const Price = styled.div`
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
`;

const InfoWindow = ({
  room,
  query,
}: {
  room: IRoomDetail;
  query: querystring.ParsedUrlQuery;
}) => {
  const { checkIn, checkOut } = query;

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
    <a href={`/room/${room._id}`} target="blank">
      <Container>
        <ImageContainer>
          <RoomCardSlider>
            {room.photos.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                width={250}
                height={167}
                quality="50"
              />
            ))}
          </RoomCardSlider>
        </ImageContainer>
        <TextContainer>
          <Title>{room.title}</Title>
          <div>
            {room.buildingType.label} {getRoomTypeText()}
          </div>
          <FlexContainer>
            <Rating>
              <IoIosStar size={16} />
              <Score>{room.rating}</Score>
              <RatingCount>({room.review.length})</RatingCount>
            </Rating>
            {checkIn && checkOut && (
              <Price>
                <FaWonSign />
                {addComma(String(room.price))} <span>/ 박</span>
              </Price>
            )}
            {!checkIn && !checkOut && <div>날짜를 입력하여 가격 확인</div>}
          </FlexContainer>
        </TextContainer>
      </Container>
    </a>
  );
};

export default InfoWindow;
