import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "store";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import palette from "styles/palette";
import { useDispatch } from "react-redux";
import AddToWishlist from "./AddToWishlist";
import NewWishlist from "./NewWishlist";
import { commonActions } from "store/common";
import { getWishlistAPI } from "lib/api/wishlist";
import { wishlistActions } from "store/wishlist";

const Container = styled.div`
  width: 568px;
  header {
    position: relative;
    padding: 0px 24px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${palette.gray_eb};
    svg {
      position: absolute;
      right: 24px;
      cursor: pointer;
    }
  }
`;

const WishlistModal = ({
  closeModal,
  createOnly = false,
}: {
  closeModal: () => void;
  createOnly?: boolean;
}) => {
  const user = useSelector((state) => state.user.user);
  const mode = useSelector((state) => state.common.wishlistMode);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!user) return;
    if (isEmpty(user.wishlist) || createOnly) {
      closeModal();
      return;
    }
    if (mode === "create") {
      dispatch(commonActions.setWishlistMode("add"));
      return;
    }
    closeModal();
  };

  useEffect(() => {
    if (!user) return;
    if (isEmpty(user.wishlist)) {
      dispatch(commonActions.setWishlistMode("create"));
    }
  }, []);

  return (
    <Container>
      <header>
        {mode === "create" && "위시리스트 이름 정하기"}
        {mode === "add" && "위시리스트에 저장하기"}
        <IoCloseSharp size={20} onClick={handleClick} />
      </header>
      {mode === "create" && (
        <NewWishlist createOnly={createOnly} closeModal={closeModal} />
      )}
      {mode === "add" && <AddToWishlist closeModal={closeModal} />}
    </Container>
  );
};

export default WishlistModal;
