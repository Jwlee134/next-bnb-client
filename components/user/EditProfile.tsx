import Button from "components/common/Button";
import Textarea from "components/common/Textarea";
import useUser from "hooks/useUser";
import { deletePhotoAPI } from "lib/api/file";
import { updateUserAPI } from "lib/api/user";
import React, { useState } from "react";
import { useSelector } from "store";
import styled from "styled-components";
import { tabletSmallBreakpoint } from "styles/theme";
import { mutate } from "swr";
import { IUser } from "types/user";

const Container = styled.div`
  width: fit-content;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
  font-size: 15px;
  text-decoration: underline;
`;

const TextContainer = styled.div`
  margin-top: 16px;
  > div:first-child {
    font-size: 20px;
    margin-bottom: 8px;
  }
  > div:last-child {
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  button {
    width: 80px;
  }
`;

const EditProfile = ({
  modifyMode,
  setModifyMode,
  newAvatarUrl,
  setNewAvatarUrl,
  data,
}: {
  modifyMode: boolean;
  setModifyMode: React.Dispatch<React.SetStateAction<boolean>>;
  newAvatarUrl: string | null;
  setNewAvatarUrl: React.Dispatch<React.SetStateAction<string | null>>;
  data: IUser;
}) => {
  const { user, mutateUser } = useUser();
  const innerWidth = useSelector((state) => state.common.innerWidth);
  const [text, setText] = useState(data.introduction || "");

  const handleChange = (value: string) => setText(value);

  const handleCancel = async () => {
    setModifyMode(false);
    if (newAvatarUrl) {
      const key = newAvatarUrl.split("/avatar/")[1];
      await deletePhotoAPI(key, "avatar");
      setNewAvatarUrl(null);
    }
  };

  const handleSave = async () => {
    try {
      mutate(
        `/api/user?id=${data._id}`,
        {
          ...data,
          avatarUrl: newAvatarUrl || data.avatarUrl,
          introduction: text,
        },
        false
      );
      await updateUserAPI({
        avatarUrl: newAvatarUrl,
        text,
        user: data._id,
        currentUser: user?._id,
      });
      if (innerWidth >= tabletSmallBreakpoint && newAvatarUrl) {
        mutateUser();
      }
      setModifyMode(false);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <>
      {!modifyMode && (
        <Container onClick={() => setModifyMode(true)}>프로필 수정</Container>
      )}
      {modifyMode && (
        <TextContainer>
          <div>소개</div>
          <Textarea value={text} onChange={handleChange} />
          <div>
            <div onClick={handleCancel}>취소</div>
            <Button
              useValidation
              isValid={newAvatarUrl !== null || !!text}
              onClick={handleSave}
              backgroundColor="black"
            >
              저장
            </Button>
          </div>
        </TextContainer>
      )}
    </>
  );
};

export default EditProfile;
