import Header from "components/header";
import React, { useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import Button from "components/common/Button";
import palette from "styles/palette";
import useModal from "hooks/useModal";
import WishlistModal from "components/modal/wishlistModal";
import ListCard from "components/wishlists/ListCard";
import useWishlist from "hooks/useWishlist";

const Container = styled.div`
  padding: 36px 80px 24px 80px;
  width: 100%;
  min-height: calc(100vh - 80px);
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
      background-color: white;
      border: 1px solid ${palette.dark_cyan};
      color: black;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
  main {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Wishlists = () => {
  const { wishlist } = useWishlist();
  const dispatch = useDispatch();

  const { openModal, closeModal, ModalPortal } = useModal();

  useEffect(() => {
    dispatch(commonActions.setShowMiniSearchBar(false));
    dispatch(commonActions.setShowSearchBar(false));
  }, []);

  const handleClick = () => {
    openModal();
    dispatch(commonActions.setWishlistMode("create"));
  };

  return (
    <>
      <Head>
        <title>위시리스트 · 에어비앤비</title>
      </Head>
      <Header useSearchBar={false} />
      <Container>
        <header>
          <div>위시리스트</div>
          <Button onClick={handleClick}>새로 만들기</Button>
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
