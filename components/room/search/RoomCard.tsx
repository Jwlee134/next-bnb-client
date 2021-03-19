import React from "react";
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

const Container = styled.div`
  width: 100%;
  height: 250px;
  border-top: 1px solid ${palette.gray_eb};
  padding: 24px 0px;
  display: flex;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 300px;
  min-width: 300px;
  height: 200px;
  border-radius: 7px;
  overflow: hidden;
  margin-right: 12px;
  background-color: ${palette.gray_eb};
`;

const InfoContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 20px;
  margin-top: 3px;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  margin-right: 5px;
  flex-grow: 1;
`;

const RightContainer = styled.div`
  width: 25px;
`;

const Divider = styled.div`
  width: 50px;
  height: 1px;
  background-color: ${palette.gray_eb};
  margin: 7px 0px;
`;

const InfoText = styled.div`
  font-size: 14px;
  font-weight: 300;
  opacity: 0.8;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Rating = styled.div`
  svg {
    color: ${palette.bittersweet};
    margin-right: 5px;
  }
  font-size: 14px;
  display: flex;
  align-items: flex-end;
`;

const Score = styled.span`
  font-weight: bold;
  margin-right: 2px;
`;

const RatingCount = styled.span`
  font-weight: 300;
  opacity: 0.7;
`;

const PriceContainer = styled.div``;

const Price = styled.div`
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
`;

const TotalPrice = styled.div`
  font-weight: 300;
  text-decoration: underline;
  opacity: 0.7;
  font-size: 14px;
  text-align: right;
`;

const RoomCard = ({ room, index }: { room: IRoomDetail; index: number }) => {
  const search = useSelector((state) => state.search);
  const {
    query: { checkIn, checkOut },
  } = useRouter();
  const dispatch = useDispatch();
  const spaces = room.spaces.join(", ");

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
    <a
      href={`/room/${room._id}?${querystring.stringify(search)}`}
      target="_blank"
      rel="noreferrer"
    >
      <Container
        onMouseOver={() => dispatch(roomActions.setHoveredItemIndex(index))}
        onMouseLeave={() => dispatch(roomActions.setHoveredItemIndex(null))}
      >
        <ImageContainer>
          <RoomCardSlider>
            {room.photos.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                width={300}
                height={201}
                quality="50"
              />
            ))}
          </RoomCardSlider>
        </ImageContainer>
        <InfoContainer>
          <TopContainer>
            <LeftContainer>
              <InfoText>
                {room.city}의 {room.buildingType.label} {getRoomTypeText()}
              </InfoText>
              <Title>{room.title}</Title>
              <Divider />
              <InfoText>
                최대 인원 {room.maximumGuestCount}명 · 침실 {room.bedroomCount}
                개 · 침대 {room.bedCount}개 · 욕실 {room.bathroomCount}개
              </InfoText>
              <InfoText>{spaces}</InfoText>
            </LeftContainer>
            <RightContainer>
              <IoMdHeartEmpty size={25} />
            </RightContainer>
          </TopContainer>
          <BottomContainer>
            <Rating>
              <IoIosStar size={18} />
              <Score>{room.rating}</Score>
              <RatingCount>({room.review.length})</RatingCount>
            </Rating>
            {checkIn && checkOut && (
              <PriceContainer>
                <Price>
                  <FaWonSign />
                  {addComma(String(room.price))} <span>/ 박</span>
                </Price>
                <TotalPrice>
                  총액 ₩{addComma(String(room.price * difference))}
                </TotalPrice>
              </PriceContainer>
            )}
          </BottomContainer>
        </InfoContainer>
      </Container>
    </a>
  );
};

export default RoomCard;
