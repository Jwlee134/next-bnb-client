import Input from "components/common/Input";
import useWishlist from "hooks/useWishlist";
import { deleteWishlistAPI, updateWishlistAPI } from "lib/api/wishlist";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import ModalFooter from "../ModalFooter";
import ModalHeader from "../ModalHeader";

const Container = styled.div`
  width: 568px;
  .setting_main-container {
    padding: 24px;
    input {
      transition: border-color 0.1s linear;
    }
    div:nth-child(2) {
      margin-top: 4px;
      font-size: 13px;
      opacity: 0.5;
    }
  }
  .setting_delete {
    padding-top: 24px;
    color: ${palette.amaranth};
    text-decoration: underline;
    cursor: pointer;
    font-weight: 500;
    width: fit-content;
  }
`;

const Setting = ({
  closeModal,
  originTitle,
}: {
  closeModal: () => void;
  originTitle: string;
}) => {
  const { mutateWishlist } = useWishlist();

  const router = useRouter();
  const { query } = router;
  const [text, setText] = useState(originTitle);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleDelete = async () => {
    try {
      await deleteWishlistAPI(query.id as string);
      mutateWishlist();
      closeModal();
      setTimeout(() => {
        router.replace("/wishlists");
      }, 400);
    } catch (error) {
      alert(error.response.data);
    }
  };

  const handleSave = async () => {
    try {
      await updateWishlistAPI({ title: text, listId: query.id as string });
      mutateWishlist();
      closeModal();
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <Container>
      <ModalHeader onClick={closeModal}>수정</ModalHeader>
      <div className="setting_main-container">
        <Input value={text} placeholder="이름" onChange={handleChange} />
        <div>최대 50자</div>
        <div className="setting_delete" onClick={handleDelete}>
          이 위시리스트 삭제
        </div>
      </div>
      <ModalFooter
        onButtonClick={handleSave}
        onAbortClick={closeModal}
        buttonText="저장"
        abortText="취소"
      />
    </Container>
  );
};

export default Setting;
