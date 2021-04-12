import Input from "components/common/Input";
import useWishlist from "hooks/useWishlist";
import { createWishlistAPI } from "lib/api/wishlist";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import styled from "styled-components";
import ModalFooter from "../ModalFooter";

const Container = styled.div`
  padding: 32px 24px;
  input {
    transition: border-color 0.1s linear;
  }
  div:last-child {
    margin-top: 4px;
    font-size: 13px;
    opacity: 0.5;
  }
  @media ${({ theme }) => theme.device.tabletSmall} {
    padding-bottom: 104px;
  }
`;

const NewWishlist = ({
  closeModal,
  createOnly,
}: {
  closeModal: () => void;
  createOnly: boolean;
}) => {
  const { user, wishlist, mutateWishlist } = useWishlist();

  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleClick = async () => {
    if (!title || !user || !wishlist) return;
    try {
      await mutateWishlist(async () => {
        const { data } = await createWishlistAPI({ title });
        if (createOnly) closeModal();
        return [...wishlist, data];
      }, false);
    } catch (error) {
      alert(error.response.data);
    }
    dispatch(commonActions.setWishlistMode("add"));
  };

  return (
    <>
      <Container>
        <Input
          value={title}
          onChange={handleChange}
          maxLength={50}
          placeholder="이름"
        />
        <div>최대 50자</div>
      </Container>
      <ModalFooter
        onButtonClick={handleClick}
        buttonText="새로 만들기"
        useOnlyButton
        useValidation
        isValid={!!title}
      />
    </>
  );
};

export default NewWishlist;
