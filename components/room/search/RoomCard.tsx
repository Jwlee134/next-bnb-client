import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { IRoomDetail } from "types/room";
import Slider from "react-slick";
import Image from "next/image";
import { IoMdHeart, IoMdHeartEmpty, IoIosStar } from "react-icons/io";
import { FaWonSign } from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addComma } from "utils";
import { useRouter } from "next/router";
import { differenceInDays } from "date-fns";
import { useSelector } from "store";
import Skeleton from "react-loading-skeleton";

const Container = styled.div`
  width: 100%;
  height: 250px;
  border-top: 1px solid ${palette.gray_eb};
  padding: 24px 0px;
  display: flex;
  cursor: pointer;
  .slick-prev {
    left: 10px;
    ::before {
      content: "‹";
      right: 55%;
      transform: translate(55%);
    }
  }
  .slick-next {
    right: 10px;
    ::before {
      content: "›";
      left: 55%;
      transform: translate(-55%);
    }
  }
  .slick-arrow {
    border-radius: 50%;
    display: none !important;
    z-index: 1;
    width: 30px;
    height: 30px;
    background-color: ${palette.gray_f7};
    opacity: 0.8;
    transition: all 0.1s linear;
    &:hover {
      background-color: white;
      opacity: 1;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.18);
    }
    ::before {
      color: black;
      font-size: 30px !important;
      position: absolute;
      top: -3.5px;
    }
  }
  &:hover {
    .slick-arrow {
      display: block !important;
    }
  }
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

const RoomCard = ({ room }: { room: IRoomDetail }) => {
  const isLoading = useSelector((state) => state.room.isLoading);
  const {
    query: { checkIn, checkOut },
  } = useRouter();
  const spaces = room.spaces.join(", ");

  const difference = differenceInDays(
    new Date(checkOut as string),
    new Date(checkIn as string)
  );

  return (
    <Container>
      <ImageContainer>
        {isLoading && <Skeleton width={300} height={201} duration={0.5} />}
        {!isLoading && (
          <Slider slidesToScroll={1} slidesToShow={1} infinite={true}>
            {room.photos.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                width={300}
                height={201}
                quality="50"
              />
            ))}
          </Slider>
        )}
      </ImageContainer>
      <InfoContainer>
        <TopContainer>
          <LeftContainer>
            <InfoText>
              {room.city}의 {room.buildingType.label}
            </InfoText>
            <Title>{room.title}</Title>
            <Divider />
            <InfoText>
              최대 인원 {room.maximumGuestCount}명 · 침실 {room.bedroomCount}개
              · 침대 {room.bedCount}개 · 욕실 {room.bathroomCount}개
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
  );
};

export default RoomCard;
