import Textarea from "components/common/Textarea";
import { submitReviewAPI } from "lib/api/review";
import { ratingOptions, stars } from "lib/staticData";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { mutate } from "swr";
import { IReservation } from "types/reservation";
import { enterKey } from "utils";
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
  @media ${({ theme }) => theme.device.tabletSmall} {
    .rating-modal_main {
      max-height: 75vh;
      padding-bottom: 80px;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    .rating-modal_main {
      display: block;
      .rating-modal_options {
        width: 100%;
      }
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
  label: string;
  value: number;
}

const RatingModal = ({
  closeModal,
  reservation,
  isToGuest,
}: {
  closeModal: () => void;
  reservation: IReservation;
  isToGuest: boolean;
}) => {
  const [rating, setRating] = useState<IState[]>([
    { label: "cleanliness", value: 0 },
    { label: "accuracy", value: 0 },
    { label: "communication", value: 0 },
    { label: "location", value: 0 },
    { label: "checkIn", value: 0 },
    { label: "satisfaction", value: 0 },
  ]);
  const [text, setText] = useState("");

  const isValid = () => {
    if (isToGuest && !!text) return true;
    const noZero = rating.some((ratingOp) => {
      return ratingOp.value !== 0;
    });
    if (noZero && !!text) return true;
    return false;
  };

  const handleSave = async () => {
    if (!isValid()) return;
    try {
      await submitReviewAPI({
        rating,
        text,
        reservation: reservation._id,
        isToGuest,
      });
      mutate(`/api/reservation?keyword=${!isToGuest ? "past" : "myRoom"}`);
      closeModal();
    } catch (error) {
      alert(error.response.data);
    }
  };

  const handleClick = (value: string, index: number) => {
    const ratingCopy = [...rating];
    const idx = ratingCopy.findIndex((option) => option.label === value);
    ratingCopy[idx].value = index + 1;
    setRating(ratingCopy);
  };

  return (
    <Container>
      <ModalHeader onClick={closeModal}>
        {isToGuest ? "게스트 후기 남기기" : "후기 남기기"}
      </ModalHeader>
      <div className="rating-modal_main">
        {!isToGuest &&
          ratingOptions.map((option, i) => (
            <div className="rating-modal_options" key={i}>
              <div>{option.label}</div>
              <div>
                {stars.map((star, i) => (
                  <Star
                    tabIndex={0}
                    aria-label={`${option.label} ${i + 1}점`}
                    clicked={
                      rating[
                        rating.findIndex(
                          (ratingOp) => ratingOp.label === option.value
                        )
                      ].value > i
                    }
                    key={i}
                    onClick={() => handleClick(option.value, i)}
                    onKeyDown={(e) => {
                      if (enterKey(e)) handleClick(option.value, i);
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
        onButtonClick={handleSave}
        onAbortClick={closeModal}
        useValidation
        isValid={isValid()}
      />
    </Container>
  );
};

export default RatingModal;
