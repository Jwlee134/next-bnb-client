import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { IoCloseSharp } from "react-icons/io5";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";

const setVisibility = (page: number, length: number) => {
  if (page === 1) {
    return css`
      .btn-left {
        visibility: hidden;
      }
    `;
  }
  if (page === length) {
    return css`
      .btn-right {
        visibility: hidden;
      }
    `;
  }
};

const Container = styled.div<{ page: number; length: number }>`
  width: 100vw;
  height: 100vh;
  background-color: ${palette.black};
  padding: 40px;
  display: flex;
  flex-direction: column;
  color: white;
  user-select: none;
  .photo-modal_header {
    position: relative;
    .dphoto-modal_index {
      padding: 8px 12px;
      margin: 0 auto;
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .photo-modal_close-button {
      position: absolute;
      right: 0;
      top: 0;
      width: fit-content;
      display: flex;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 8px;
      svg {
        margin-right: 4px;
      }
      &:hover {
        background-color: ${palette.gray_48};
      }
      margin: auto 0 auto auto;
    }
  }
  .photo-modal_photo-container {
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .photo-container_button {
      border: 2px solid ${palette.gray_b0};
      border-radius: 50%;
      height: fit-content;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: ${palette.gray_48};
      }
      cursor: pointer;
    }
    .photo-container_photo {
      width: 70%;
      padding: 40px;
      div {
        padding-top: 56.25%;
        height: 0;
        position: relative;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }
  ${({ page, length }) => setVisibility(page, length)}
`;

const PhotoModal = ({
  photos,
  closeModal,
}: {
  photos: string[];
  closeModal: () => void;
}) => {
  const photoIndex = useSelector((state) => state.common.photoIndex);
  const dispatch = useDispatch();

  useEffect(() => {
    if (photoIndex + 1 !== photos.length) {
      const img = new Image();
      img.src = photos[photoIndex + 1];
    }
  }, [photos, photoIndex]);

  return (
    <Container page={photoIndex + 1} length={photos.length}>
      <div className="photo-modal_header">
        <div className="dphoto-modal_index">
          {photoIndex + 1} ⁄ {photos.length}
        </div>
        <div className="photo-modal_close-button" onClick={closeModal}>
          <IoCloseSharp size={20} />
          닫기
        </div>
      </div>
      <div className="photo-modal_photo-container">
        <div
          className="photo-container_button btn-left"
          onClick={() => dispatch(commonActions.setPhotoIndex(photoIndex - 1))}
        >
          <BsChevronLeft />
        </div>
        <div className="photo-container_photo">
          <div>
            <img src={photos[photoIndex]} alt="" />
          </div>
        </div>
        <div
          className="photo-container_button btn-right"
          onClick={() => dispatch(commonActions.setPhotoIndex(photoIndex + 1))}
        >
          <BsChevronRight />
        </div>
      </div>
    </Container>
  );
};

export default PhotoModal;
