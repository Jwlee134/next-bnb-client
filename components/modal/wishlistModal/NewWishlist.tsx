import Button from "components/common/Button";
import Input from "components/common/Input";
import { createWishlistAPI } from "lib/api/wishlist";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { commonActions } from "store/common";
import { wishlistActions } from "store/wishlist";
import styled, { css } from "styled-components";
import palette from "styles/palette";

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
`;

const ButtonContainer = styled.div<{ noValue: boolean }>`
  padding: 16px 24px;
  border-top: 1px solid ${palette.gray_eb};
  button {
    background-color: ${palette.black};
    color: white;
    ${({ noValue }) =>
      !noValue &&
      css`
        cursor: not-allowed;
        background-color: ${palette.gray_dd};
      `}
  }
`;

const NewWishlist = ({
  closeModal,
  createOnly,
}: {
  closeModal: () => void;
  createOnly: boolean;
}) => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const user = useSelector((state) => state.user.user);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleClick = async () => {
    if (!title || !user) return;
    try {
      const { data } = await createWishlistAPI({ title, id: user._id });
      dispatch(wishlistActions.setWishlist([...wishlist, data]));
    } catch (error) {
      alert(error.response.data);
    }
    if (createOnly) return closeModal();
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
      <ButtonContainer noValue={!!title}>
        <Button onClick={handleClick}>새로 만들기</Button>
      </ButtonContainer>
    </>
  );
};

export default NewWishlist;
