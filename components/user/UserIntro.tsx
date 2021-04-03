import useUser from "hooks/useUser";
import { uploadPhotoAPI } from "lib/api/file";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import styled from "styled-components";
import palette from "styles/palette";
import { IUser } from "types/user";

const EditProfile = dynamic(() => import("./EditProfile"));

const Container = styled.div`
  display: flex;
  > div:first-child {
    width: 128px;
    min-width: 128px;
    height: 128px;
    position: relative;
    img {
      width: 100%;
      border-radius: 50%;
      height: 100%;
      object-fit: cover;
    }
    > div {
      position: absolute;
      z-index: 1;
      bottom: 0px;
      right: 0px;
      background-color: white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: 1px solid ${palette.gray_dd};
      svg {
        color: black;
      }
    }
  }
  > div:last-child {
    width: 100%;
    margin-left: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    > div:first-child {
      font-size: 34px;
      font-weight: 500;
    }
    > div:nth-child(2) {
      opacity: 0.7;
      font-weight: 300;
      margin-top: 5px;
    }
  }
`;

const UserIntro = ({ data }: { data: IUser }) => {
  const { user } = useUser();
  const [modifyMode, setModifyMode] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState<string | null>(null);

  const handleUpload = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const { data } = await uploadPhotoAPI({
          data: formData,
          location: "avatar",
        });
        setNewAvatarUrl(data[0]);
      } catch (error) {
        alert(error.response.data);
      }
    }
  };

  const handleAvatarUrl = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = handleUpload;
    input.accept = "image/*";
    input.click();
  };

  return (
    <Container>
      <div>
        <img
          src={
            user?._id !== data._id
              ? data.avatarUrl
              : newAvatarUrl || data.avatarUrl
          }
          alt=""
        />
        {modifyMode && (
          <div onClick={handleAvatarUrl}>
            <HiPencil size={24} />
          </div>
        )}
      </div>
      <div>
        <div>안녕하세요. 저는 {data.name}입니다.</div>
        <div>회원가입: {new Date(data.createdAt).getFullYear()}</div>
        {user?._id === data._id && (
          <EditProfile
            user={user as IUser}
            newAvatarUrl={newAvatarUrl}
            modifyMode={modifyMode}
            setModifyMode={setModifyMode}
            setNewAvatarUrl={setNewAvatarUrl}
          />
        )}
      </div>
    </Container>
  );
};

export default UserIntro;
