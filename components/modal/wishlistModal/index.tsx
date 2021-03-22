import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "store";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import AddToWishlist from "./AddToWishlist";
import NewWishlist from "./NewWishlist";
import ModalHeader from "../ModalHeader";

const Container = styled.div`
  width: 568px;
`;

const WishlistModal = ({
  closeModal,
  createOnly = false,
}: {
  closeModal: () => void;
  createOnly?: boolean;
}) => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const mode = useSelector((state) => state.common.wishlistMode);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (isEmpty(wishlist) || createOnly) {
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
    if (isEmpty(wishlist)) {
      dispatch(commonActions.setWishlistMode("create"));
    }
  }, []);

  return (
    <Container>
      <ModalHeader onClick={handleClick}>
        {mode === "create" && "위시리스트 이름 정하기"}
        {mode === "add" && "위시리스트에 저장하기"}
      </ModalHeader>
      {mode === "create" && (
        <NewWishlist createOnly={createOnly} closeModal={closeModal} />
      )}
      {mode === "add" && <AddToWishlist closeModal={closeModal} />}
    </Container>
  );
};

export default WishlistModal;
