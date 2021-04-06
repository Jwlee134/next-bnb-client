import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import Button from "components/common/Button";
import useModal from "hooks/useModal";
import WishlistModal from "components/modal/wishlistModal";
import ListCard from "components/wishlists/ListCard";
import useWishlist from "hooks/useWishlist";
import useUser from "hooks/useUser";

const Container = styled.div`
  padding: 36px 80px 24px 80px;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth.wide};
  min-height: calc(100vh - 80px);
  margin: 0 auto;
  header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 36px;
    > div {
      font-size: 32px;
      font-weight: 700;
    }
    button {
      width: 130px;
    }
  }
  main {
    display: flex;
    flex-wrap: wrap;
  }
  @media ${({ theme }) => theme.device.tablet} {
    padding: 36px 24px 64px 24px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    header {
      > div {
        font-size: 26px;
        font-weight: 500;
      }
    }
  }
`;

const Wishlists = () => {
  useUser("/");
  const { wishlist } = useWishlist();
  const dispatch = useDispatch();

  const { openModal, closeModal, ModalPortal } = useModal();

  const handleClick = () => {
    openModal();
    dispatch(commonActions.setWishlistMode("create"));
  };

  return (
    <>
      <Container>
        <header>
          <div>위시리스트</div>
          <Button backgroundColor="white" onClick={handleClick}>
            새로 만들기
          </Button>
        </header>
        <main>
          {wishlist?.map((list, i) => (
            <ListCard item={list} key={i} />
          ))}
        </main>
      </Container>
      <ModalPortal>
        <WishlistModal closeModal={closeModal} createOnly />
      </ModalPortal>
    </>
  );
};

export default Wishlists;
