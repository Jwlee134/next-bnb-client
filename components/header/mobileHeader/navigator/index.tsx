import React from "react";
import styled from "styled-components";
import { FaAirbnb } from "react-icons/fa";
import { IoMdHeartEmpty, IoIosSearch } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import palette from "styles/palette";
import Link from "next/link";
import useUser from "hooks/useUser";
import useModal from "hooks/useModal";
import AuthModal from "components/modal/authModal";
import { useRouter } from "next/router";

interface ContainerProps {
  pathname: string;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 64px;
  background-color: white;
  position: fixed;
  bottom: 0;
  z-index: 12;
  border-top: 1px solid ${palette.gray_eb};
  .navigator_icon-container {
    display: flex;
    justify-content: space-between;
    max-width: 560px;
    height: 100%;
    margin: 0 auto;
    a {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
      div {
        font-size: 12px;
        margin-top: 2px;
      }
    }
  }
`;

const Navigator = () => {
  const { pathname } = useRouter();
  const { user } = useUser();
  const { openModal, closeModal, ModalPortal } = useModal();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user || !user.isLoggedIn) e.preventDefault();
    openModal();
  };

  return (
    <>
      <Container pathname={pathname}>
        <div className="navigator_icon-container">
          <Link href="/">
            <a>
              <IoIosSearch size={25} />
              <div>둘러보기</div>
            </a>
          </Link>
          <Link href="/reservations">
            <a onClick={handleClick}>
              <FaAirbnb size={25} />
              <div>예약</div>
            </a>
          </Link>
          <Link href="/wishlists">
            <a onClick={handleClick}>
              <IoMdHeartEmpty size={25} />
              <div>위시리스트</div>
            </a>
          </Link>
          <Link href={`/user/${user?._id}`}>
            <a onClick={handleClick}>
              <BsPerson size={25} />
              <div>프로필</div>
            </a>
          </Link>
        </div>
      </Container>
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default Navigator;
