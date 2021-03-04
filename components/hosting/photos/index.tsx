import Button from "components/common/Button";
import { uploadPhotoAPI } from "lib/api/file";
import { isEmpty } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div``;

const PhotoContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 ratio */
  height: 0;
  overflow: hidden;
  margin-bottom: 24px;
`;

const AddBox = styled.div`
  border: 2px dashed #bbbbbb;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  input {
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
  button {
    width: 120px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Photos = () => {
  const { photos } = useSelector((state) => state.hosting);
  const dispatch = useDispatch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append(`${i}`, files[i]);
      }
      try {
        const { data } = await uploadPhotoAPI(formData);
        console.log(data);
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
          이상의 사진을 업로드하세요. 원하는 대로 드래그하여 사진 배치 순서를
          결정할 수 있습니다. 언제든 사진을 추가하거나 수정하실 수 있습니다.
        </h3>
        {isEmpty(photos) && (
          <PhotoContainer>
            <AddBox>
              <Button>사진 업로드</Button>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
              />
            </AddBox>
          </PhotoContainer>
        )}
      </Container>
      <Footer nextHref="/become-a-host/photos" />
    </>
  );
};

export default Photos;
