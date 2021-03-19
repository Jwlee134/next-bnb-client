import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { IoAlbumsOutline } from "react-icons/io5";
import useModal from "hooks/useModal";
import PhotoModal from "components/modal/photoModal";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import { roomActions } from "store/room";

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0;
  cursor: pointer;
`;

const OnePhoto = styled.div`
  max-width: 950px;
  margin: 0 auto;
  border-radius: 14px;
  overflow: hidden;
  div {
    position: relative;
    padding-top: 56.25%;
    height: 0;
    &:hover {
      ${Background} {
        opacity: 0.1;
        z-index: 1;
      }
    }
  }
`;

const TwoPhotos = styled.div`
  display: flex;
  border-radius: 14px;
  overflow: hidden;
  > div {
    width: 50%;
    &:first-child {
      > div {
        margin-right: 8px;
      }
    }
    > div {
      position: relative;
      padding-top: 56.25%;
      height: 0;
      &:hover {
        ${Background} {
          opacity: 0.1;
          z-index: 1;
        }
      }
    }
  }
`;

const ManyPhotos = styled.div`
  display: flex;
  border-radius: 14px;
  overflow: hidden;
  .first-photo {
    width: 50%;
    margin-right: 8px;
    > div {
      padding-top: 75%;
      position: relative;
      &:hover {
        ${Background} {
          opacity: 0.1;
          z-index: 1;
        }
      }
    }
  }
  .rest-photos {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .rest-photo {
      width: calc(50% - 4px);
      > div {
        padding-top: calc(75% - 1.5px);
        position: relative;
        height: 0;
        &:hover {
          ${Background} {
            opacity: 0.1;
            z-index: 1;
          }
        }
      }
      &:first-child {
        margin-right: 8px;
        margin-bottom: 8px;
      }
      &:nth-child(3) {
        margin-right: 8px;
      }
    }
    > div:not(.rest-photo) {
      position: absolute;
      right: 15px;
      bottom: 15px;
      background-color: white;
      padding: 4px 8px;
      border-radius: 7px;
      z-index: 1;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
      font-weight: 500;
      display: flex;
      align-items: center;
      &:hover {
        background-color: ${palette.gray_f7};
      }
      svg {
        margin-right: 3px;
      }
    }
  }
`;

const Photos = ({ photos }: { photos: string[] }) => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const withoutFirstPhoto = photos.slice(1, 5);
  const dispatch = useDispatch();

  const handleIndex = (i: number) => {
    dispatch(roomActions.setPhotoIndex(i));
    openModal();
  };

  const handleGallery = () => {
    dispatch(roomActions.setPhotoIndex(0));
    openModal();
  };

  if (photos.length === 1) {
    return (
      <OnePhoto>
        <div>
          <Background onClick={() => handleIndex(0)} />
          <Image
            src={photos[0]}
            layout="fill"
            objectFit="cover"
            loading="eager"
          />
        </div>
      </OnePhoto>
    );
  }
  if (photos.length === 2) {
    return (
      <>
        <TwoPhotos>
          {photos.map((photo, i) => (
            <div key={i}>
              <div>
                <Background onClick={() => handleIndex(i)} />
                <Image
                  src={photo}
                  layout="fill"
                  objectFit="cover"
                  loading="eager"
                />
              </div>
            </div>
          ))}
        </TwoPhotos>
        <ModalPortal>
          <PhotoModal photos={photos} closeModal={closeModal} />
        </ModalPortal>
      </>
    );
  }
  return (
    <>
      <ManyPhotos>
        <div className="first-photo">
          <div>
            <Background onClick={() => handleIndex(0)} />
            <Image
              className="detail-photo"
              src={photos[0]}
              layout="fill"
              objectFit="cover"
              loading="eager"
            />
          </div>
        </div>
        <div className="rest-photos">
          {withoutFirstPhoto.map((photo, i) => (
            <div className="rest-photo" key={i}>
              <div>
                <Background onClick={() => handleIndex(i + 1)} />
                <Image
                  className="detail-photo"
                  src={photo}
                  layout="fill"
                  objectFit="cover"
                  loading="eager"
                />
              </div>
            </div>
          ))}
          {photos.length > 5 && (
            <div onClick={handleGallery}>
              <IoAlbumsOutline size={18} />
              사진 모두 보기
            </div>
          )}
        </div>
      </ManyPhotos>
      <ModalPortal>
        <PhotoModal photos={photos} closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default Photos;
