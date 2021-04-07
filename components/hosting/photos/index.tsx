import Button from "components/common/Button";
import { uploadPhotoAPI } from "lib/api/file";
import { isEmpty } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";
import PhotoList from "./PhotoList";

const Container = styled.div`
  margin-bottom: 12px;
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 1;
  }
  .photos_photo-container {
    position: relative;
    padding-top: 56.25%;
    height: 0;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .photos_add-box {
    border: 2px dashed #bbbbbb;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    button {
      width: 120px;
      margin-bottom: 12px;
      z-index: -1;
    }
    span {
      opacity: 0.5;
      font-size: 14px;
      z-index: -1;
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    .photos_add-box {
      button {
        margin-bottom: 0;
      }
      span {
        display: none;
      }
    }
  }
`;

const Photos = () => {
  const { photos } = useSelector((state) => state.hosting);
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
        dispatch(hostingActions.setPhotos(data));
      } catch (error) {
        alert(error.response.data);
      }
    }
  };

  return (
    <>
      <Container>
        <h1>멋진 사진으로 숙소가 돋보이게 해주세요.</h1>
        <h3>
          휴대전화나 카메라를 사용하여 사진을 찍으세요. 숙소를 등록하려면 1장
          이상의 사진을 업로드하세요. 언제든 사진을 추가하거나 수정하실 수
          있습니다.
        </h3>
        {isEmpty(photos) && (
          <div className="photos_photo-container">
            <div className="photos_add-box">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
              />
              <Button backgroundColor="bittersweet">사진 업로드</Button>
              <span>또는 이곳으로 사진을 드래그하세요.</span>
            </div>
          </div>
        )}
        {!isEmpty(photos) && <PhotoList photos={photos} />}
      </Container>
      <Footer
        isValid={!isEmpty(photos)}
        nextHref="/become-a-host/description"
      />
    </>
  );
};

export default Photos;
