import Textarea from "components/common/Textarea";
import { submitReviewAPI } from "lib/api/review";
import { ratingOptions, stars } from "lib/staticData";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { mutate } from "swr";
import { IReservation } from "types/reservation";
import ModalFooter from "../ModalFooter";
import ModalHeader from "../ModalHeader";

const Container = styled.div`
  width: 568px;
  .rating-modal_main {
    max-height: 70vh;
    overflow: auto;
    padding: 24px 24px 0px 24px;
    display: flex;
    flex-wrap: wrap;
    .rating-modal_options {
      width: 50%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        font-weight: 300;
        margin-bottom: 10px;
      }
    }
    .rating-modal_text {
      width: 100%;
    }
  }
`;

const Star = styled.span<{ clicked: boolean }>`
  color: ${palette.gray_dd};
  font-size: 28px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 5px;
  }
  ${({ clicked }) =>
    clicked &&
    css`
      color: ${palette.bittersweet};
    `}
`;

interface IState {
  cleanliness: number;
  accuracy: number;
  communication: number;
  location: number;
  checkIn: number;
  satisfaction: number;
  [key: string]: number;
}

const RatingModal = ({
  closeModal,
  reservation,
}: {
  closeModal: () => void;
  reservation: IReservation;
}) => {
  const [rating, setRating] = useState<IState>({
    cleanliness: 0,
    accuracy: 0,
    communication: 0,
    location: 0,
    checkIn: 0,
    satisfaction: 0,
  });
  const [text, setText] = useState("");

  const isValid =
    rating.cleanliness !== 0 &&
    rating.accuracy !== 0 &&
    rating.communication !== 0 &&
    rating.location !== 0 &&
    rating.checkIn !== 0 &&
    rating.satisfaction !== 0 &&
    !!text;

  const handleClick = async () => {
    if (!isValid) return;
    try {
      await submitReviewAPI({
        rating,
        text,
        reservation: reservation._id,
      });
      mutate("/api/reservation?keyword=past");
      closeModal();
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <Container>
      <ModalHeader onClick={closeModal}>후기 남기기</ModalHeader>
      <div className="rating-modal_main">
        {ratingOptions.map((option, i) => (
          <div className="rating-modal_options" key={i}>
            <div>{option.label}</div>
            <div>
              {stars.map((star, i) => (
                <Star
                  clicked={rating[option.value] > i}
                  key={i}
                  onClick={() => {
                    setRating({ ...rating, [option.value]: i + 1 });
                  }}
                >
                  {star}
                </Star>
              ))}
            </div>
          </div>
        ))}
        <div className="rating-modal_text">
          <Textarea
            value={text}
            maxLength={300}
            onChange={(value) => setText(value)}
          />
        </div>
      </div>
      <ModalFooter
        buttonText="저장"
        abortText="취소"
        onButtonClick={handleClick}
        onAbortClick={closeModal}
        useValidation
        isValid={isValid}
      />
    </Container>
  );
};

export default RatingModal;
