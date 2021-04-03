import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { deletePhotoAPI, uploadPhotoAPI } from "lib/api/file";
import { useDispatch } from "react-redux";
import { hostingActions } from "store/hosting";
import { IoTrashOutline } from "react-icons/io5";

const Button = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 50%;
  background-color: white;
  border: 0;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
  opacity: 0;
  transition: opacity 0.2s linear;
`;

const FirstPhotoContainer = styled.div`
  position: relative;
  padding-top: 56.25%;
  height: 0;
  overflow: hidden;
  margin-bottom: 12px;
  border-radius: 5px;
  &:hover {
    ${Button} {
      opacity: 1;
    }
  }
`;

const RestContainer = styled.div`
  display: inline-block;
  width: calc((100% / 2) - 6px);
  padding-top: 28.125%;
  position: relative;
  overflow: hidden;
  margin-bottom: 12px;
  border-radius: 5px;
  &:nth-child(2n) {
    margin-right: 12px;
  }
  &:hover {
    ${Button} {
      opacity: 1;
    }
  }
`;

const Add = styled.div`
  border: 2px dashed #bbbbbb;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
`;

const PhotoList = ({ photos }: { photos: string[] }) => {
  const dispatch = useDispatch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append(`${i}`, files[i]);
      }
      try {
        const { data } = await uploadPhotoAPI({
          data: formData,
          location: "room",
        });
        dispatch(hostingActions.setPhotos([...photos, ...data]));
      } catch (error) {
        alert(error.response.data);
      }
    }
  };

  const handleDelete = async (index: number) => {
    const key = photos[index].split("/room/")[1];
    if (key) {
      try {
        await deletePhotoAPI(key, "room");
        const newPhotos = [...photos];
        newPhotos.splice(index, 1);
        dispatch(hostingActions.setPhotos(newPhotos));
      } catch (error) {
        alert(error.response.data);
      }
    }
  };

  return (
    <>
      {photos.map((photo, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <FirstPhotoContainer>
              <Image src={photos[0]} layout="fill" objectFit="cover" />
              <Button>
                <IoTrashOutline onClick={() => handleDelete(index)} size={18} />
              </Button>
            </FirstPhotoContainer>
          )}
          {index > 0 && (
            <RestContainer>
              <Image src={photo} layout="fill" objectFit="cover" />
              <Button>
                <IoTrashOutline onClick={() => handleDelete(index)} size={18} />
              </Button>
            </RestContainer>
          )}
        </React.Fragment>
      ))}
      <RestContainer>
        <input type="file" accept="image/*" multiple onChange={handleChange} />
        <Add>추가하기</Add>
      </RestContainer>
    </>
  );
};

export default PhotoList;
