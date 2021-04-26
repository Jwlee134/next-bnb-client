import RatingModal from "components/modal/ratingModal";
import { format } from "date-fns";
import useModal from "hooks/useModal";
import Link from "next/link";
import React from "react";
import { useSelector } from "store";
import styled from "styled-components";
import palette from "styles/palette";
import { tabletSmallBreakpoint } from "styles/theme";
import { IReservation } from "types/reservation";
import { addComma, enterKey } from "utils";

const Container = styled.div`
  width: 100%;
  box-shadow: 0 1px 8px 0 rgb(0 0 0 / 12%), 0 2px 3px -1px rgb(0 0 0 / 20%);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 16px;
  .reservation-card_img {
    width: 80px;
    min-width: 80px;
    height: 80px;
    border-radius: 5px;
    object-fit: cover;
    margin-right: 24px;
    background-color: ${palette.gray_eb};
  }
  &:hover {
    box-shadow: 0 3px 18px 0 rgb(0 0 0 / 12%), 0 3px 5px -1px rgb(0 0 0 / 20%);
  }
  .reservation-card_left {
    > a {
      display: flex;
      flex-grow: 1;
    }
  }
  .reservation-card_left_no-room {
    display: flex;
    flex-grow: 1;
  }
  .reservation-card_text-container {
    width: 100%;
    div:first-child {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      margin-bottom: 5px;
    }
    div:not(:first-child) {
      font-size: 14px;
      opacity: 0.7;
      font-weight: 300;
      margin-bottom: 5px;
      a {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .reservation-card_right {
    min-width: 120px;
    max-width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    div:first-child {
      font-weight: 700;
      text-align: right;
      > div {
        margin-bottom: 4px;
      }
    }
    span {
      font-weight: 300;
      font-size: 15px;
      a {
        text-decoration: underline;
      }
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    .reservation-card_img {
      margin-bottom: 12px;
    }
    .reservation-card_left {
      > a {
        flex-direction: column;
      }
    }
    .reservation-card_left_no-room {
      flex-direction: column;
    }
    .reservation-card_right {
      min-width: initial;
      white-space: nowrap;
      margin-left: 12px;
    }
  }
`;

const Review = styled.div`
  font-size: 15px;
  opacity: 0.7;
  text-decoration: underline;
  cursor: pointer;
`;

const formatText = "yyyy년 MM월 dd일";

const ReservationCard = ({
  reservation,
  isMyRoom = false,
  isPast = false,
}: {
  reservation: IReservation;
  isMyRoom?: boolean;
  isPast?: boolean;
}) => {
  const innerWidth = useSelector((state) => state.common.innerWidth);
  const { openModal, closeModal, ModalPortal } = useModal();
  return (
    <>
      <Container>
        {reservation.room &&
          (innerWidth >= tabletSmallBreakpoint ? (
            <div className="reservation-card_left">
              <a
                href={`/room/${reservation.room._id}?adults=1&children=0&infants=0`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="reservation-card_img"
                  src={reservation.room.photos[0]}
                  alt="숙소 사진"
                />
                <div className="reservation-card_text-container">
                  <div>{reservation.room.title}</div>
                  <div>
                    {format(new Date(reservation.checkIn), formatText)} ~{" "}
                    {format(new Date(reservation.checkOut), formatText)} ·{" "}
                    {reservation.room.city}
                  </div>
                  <div>게스트 {reservation.guestCount}명</div>
                </div>
              </a>
            </div>
          ) : (
            <div className="reservation-card_left">
              <Link
                href={`/room/${reservation.room._id}?adults=1&children=0&infants=0`}
              >
                <a>
                  <img
                    className="reservation-card_img"
                    src={reservation.room.photos[0]}
                    alt="숙소 사진"
                  />
                  <div className="reservation-card_text-container">
                    <div>{reservation.room.title}</div>
                    <div>
                      {format(new Date(reservation.checkIn), formatText)} ~{" "}
                      {format(new Date(reservation.checkOut), formatText)} ·{" "}
                      {reservation.room.city}
                    </div>
                    <div>게스트 {reservation.guestCount}명</div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        {!reservation.room && (
          <div className="reservation-card_left reservation-card_left_no-room">
            <div className="reservation-card_img" />
            <div className="reservation-card_text-container">
              <div>삭제된 숙소</div>
              <div>
                {format(new Date(reservation.checkIn), formatText)} ~{" "}
                {format(new Date(reservation.checkOut), formatText)}
              </div>
              <div>게스트 {reservation.guestCount}명</div>
            </div>
          </div>
        )}
        <div className="reservation-card_right">
          <div>
            <div>￦{addComma(String(reservation.price))}</div>{" "}
            {isMyRoom && (
              <span>
                게스트:{" "}
                <Link href={`/user/${reservation.guest._id}`}>
                  <a>{reservation.guest.name}</a>
                </Link>
              </span>
            )}
          </div>
          {isPast &&
            (!reservation.guestReviewed ? (
              <Review
                tabIndex={0}
                role="button"
                onClick={openModal}
                onKeyDown={(e) => {
                  if (enterKey(e)) openModal();
                }}
              >
                후기 남기기
              </Review>
            ) : (
              <div>완료</div>
            ))}
          {isMyRoom &&
            new Date() > new Date(reservation.checkOut) &&
            (!reservation.hostReviewed ? (
              <Review
                tabIndex={0}
                role="button"
                onClick={openModal}
                onKeyDown={(e) => {
                  if (enterKey(e)) openModal();
                }}
              >
                게스트 후기 남기기
              </Review>
            ) : (
              <div>완료</div>
            ))}
        </div>
      </Container>
      <ModalPortal>
        <RatingModal
          isToGuest={isMyRoom}
          reservation={reservation}
          closeModal={closeModal}
        />
      </ModalPortal>
    </>
  );
};

export default ReservationCard;
