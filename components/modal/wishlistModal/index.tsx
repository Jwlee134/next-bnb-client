import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "store";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import palette from "styles/palette";
import NewWishlist from "./NewWishlist";
import { useDispatch } from "react-redux";
import { wishlistActions } from "store/wishlist";
import AddToWishlist from "./AddToWishlist";

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

const WishlistModal = ({ closeModal }: { closeModal: () => void }) => {
  const mode = useSelector((state) => state.wishlist.mode);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (isEmpty(wishlist)) {
      closeModal();
      return;
    }
    if (mode === "create") {
      dispatch(wishlistActions.setMode("add"));
      return;
    }
    closeModal();
  };

  useEffect(() => {
    if (isEmpty(wishlist)) dispatch(wishlistActions.setMode("create"));
  }, []);

  return (
    <Container>
      <header>
        {mode === "create" && "위시리스트 이름 정하기"}
        {mode === "add" && "위시리스트에 저장하기"}
        <IoCloseSharp size={20} onClick={handleClick} />
      </header>
      {mode === "create" && <NewWishlist />}
      {mode === "add" && <AddToWishlist closeModal={closeModal} />}
    </Container>
  );
};

export default WishlistModal;
