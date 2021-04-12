import React from "react";
import styled, { css } from "styled-components";
import { FaAirbnb } from "react-icons/fa";
import { IoMdHeartEmpty, IoIosSearch } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import palette from "styles/palette";
import Link from "next/link";
import useUser from "hooks/useUser";
import useModal from "hooks/useModal";
import AuthModal from "components/modal/authModal";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import Notification from "components/common/Notification";

const Container = styled.div`
  width: 100%;
  height: 64px;
  background-color: white;
  position: fixed;
  bottom: 0;
  z-index: 10;
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
      position: relative;
    }
  }
`;

const IconButton = styled.div<{ current: boolean | undefined }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
  margin-top: 2px;
  opacity: 0.4;
  ${({ current }) =>
    current &&
    css`
      opacity: 1;
      svg {
        color: ${palette.amaranth};
      }
    `}
`;

const Navigator = () => {
  const { pathname } = useRouter();
  const { user } = useUser();
  const { openModal, closeModal, ModalPortal } = useModal();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user || !user.isLoggedIn) {
      e.preventDefault();
      openModal();
    }
  };

  return (
    <>
      <Container>
        <div className="navigator_icon-container">
          <Link href="/">
            <a>
              <IconButton
                current={pathname === "/" || pathname.includes("room")}
              >
                <IoIosSearch size={25} />
                <div>둘러보기</div>
              </IconButton>
            </a>
          </Link>
          {user && user.isLoggedIn && (
            <>
              <Link href="/reservations">
                <a onClick={handleClick}>
                  {!isEmpty(user.unreadNotifications) && (
                    <Notification isNavigator>
                      {user.unreadNotifications.length}
                    </Notification>
                  )}
                  <IconButton current={pathname.includes("reservation")}>
                    <FaAirbnb size={25} />
                    <div>예약</div>
                  </IconButton>
                </a>
              </Link>
              <Link href="/wishlists">
                <a onClick={handleClick}>
                  <IconButton current={pathname.includes("wishlist")}>
                    <IoMdHeartEmpty size={25} />
                    <div>위시리스트</div>
                  </IconButton>
                </a>
              </Link>
            </>
          )}
          <Link href={`/user/${user?._id}`}>
            <a onClick={handleClick}>
              <IconButton
                current={pathname === "/user/[id]" && user?.isLoggedIn}
              >
                <BsPerson size={25} />
                <div>{user?.isLoggedIn ? "프로필" : "로그인"}</div>
              </IconButton>
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
