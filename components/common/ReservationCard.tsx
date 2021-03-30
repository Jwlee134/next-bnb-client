import RatingModal from "components/modal/ratingModal";
import { format } from "date-fns";
import useModal from "hooks/useModal";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { IReservation } from "types/reservation";
import { addComma } from "utils";

const Container = styled.div`
  width: 100%;
  height: 128px;
  box-shadow: 0 1px 8px 0 rgb(0 0 0 / 12%), 0 2px 3px -1px rgb(0 0 0 / 20%);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 16px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    object-fit: cover;
    margin-right: 24px;
  }
  &:hover {
    box-shadow: 0 3px 18px 0 rgb(0 0 0 / 12%), 0 3px 5px -1px rgb(0 0 0 / 20%);
  }
  .reservation-card_left {
    display: flex;
    flex-grow: 1;
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
  }
  .reservation-card_right {
    min-width: 100px;
    max-width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    div:first-child {
      font-weight: 700;
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
  const { openModal, closeModal, ModalPortal } = useModal();
  return (
    <>
      <Container>
        <div className="reservation-card_left">
          <img src={reservation.room.photos[0]} alt="" />
          <div className="reservation-card_text-container">
            <div>{reservation.room.title}</div>
            <div>
              {format(new Date(reservation.checkIn), formatText)} ~{" "}
              {format(new Date(reservation.checkOut), formatText)} ·{" "}
              {reservation.room.city}
            </div>
            <div>
              게스트 {reservation.guestCount}명
              {isMyRoom && (
                <span>
                  {" "}
                  · 게스트:{" "}
                  <Link href={`/user/${reservation.guest._id}`}>
                    {reservation.guest.name}
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="reservation-card_right">
          <div>￦{addComma(String(reservation.price))}</div>
          {isPast &&
            (!reservation.reviewed ? (
              <Review onClick={openModal}>후기 남기기</Review>
            ) : (
              <div>완료</div>
            ))}
        </div>
      </Container>
      {isPast && (
        <ModalPortal>
          <RatingModal reservation={reservation} closeModal={closeModal} />
        </ModalPortal>
      )}
    </>
  );
};

export default ReservationCard;
