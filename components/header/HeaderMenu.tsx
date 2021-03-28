import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";
import { IoIosMenu } from "react-icons/io";
import palette from "styles/palette";
import useModal from "hooks/useModal";
import AuthModal from "components/modal/authModal";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import { logoutAPI } from "lib/api/auth";
import Link from "next/link";
import useUser from "hooks/useUser";
import useSocket from "hooks/useSocket";

const Container = styled.div<{ popupOpened: boolean }>`
  position: relative;
  width: 77px;
  height: 42px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 21px;
  padding: 6px;
  background-color: white;
  cursor: pointer;
  transition: box-shadow 0.1s linear;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    margin-left: 8px;
  }
  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
  }
  ${({ popupOpened }) =>
    popupOpened &&
    css`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
    `}
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 21px;
`;

const PopupContainer = styled.div`
  position: absolute;
  background-color: white;
  width: 200px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  top: 50px;
  right: 0;
  cursor: default;
  padding: 6px 0px;
  z-index: 2;
`;

const List = styled.ul``;

const ListItem = styled.li`
  height: 42px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  cursor: pointer;
  font-weight: 300;
  &:hover {
    background-color: ${palette.gray_f7};
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${palette.gray_dd};
  margin: 6px 0px;
`;

const HeaderMenu = () => {
  const { user, mutateUser } = useUser();
  const socket = useSocket();

  const [popupOpened, setPopupOpened] = useState(false);
  const { openModal, closeModal, ModalPortal } = useModal();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setPopupOpened(false);
    socket?.emit("logout", { user: user?._id });
    mutateUser(async () => {
      const { data } = await logoutAPI();
      return data;
    });
  };

  useEffect(() => {
    if (!socket || !user) return;
    if (user.isLoggedIn) {
      socket.emit("login", { user: user._id });
    }
    socket.on("reservationRequest", (data) => {
      console.log(data);
    });
  }, [socket, user]);

  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <Container
          popupOpened={popupOpened}
          onClick={() => setPopupOpened(!popupOpened)}
        >
          <IoIosMenu size={20} />
          <Image
            src={
              user?.avatarUrl ||
              "/static/image/user/default_user_profile_image.jpg"
            }
          />
        </Container>
        {popupOpened && (
          <PopupContainer>
            <List>
              {!user?.isLoggedIn && (
                <>
                  <ListItem
                    onClick={() => {
                      openModal();
                      setPopupOpened(false);
                      dispatch(commonActions.setAuthMode("login"));
                    }}
                  >
                    로그인
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      openModal();
                      setPopupOpened(false);
                      dispatch(commonActions.setAuthMode("signUp"));
                    }}
                  >
                    회원가입
                  </ListItem>
                </>
              )}
              {user?.isLoggedIn && (
                <>
                  <Link href="/reservations">
                    <a>
                      <ListItem onClick={() => setPopupOpened(false)}>
                        예약
                      </ListItem>
                    </a>
                  </Link>
                  <Link href="/wishlists">
                    <a>
                      <ListItem onClick={() => setPopupOpened(false)}>
                        위시리스트
                      </ListItem>
                    </a>
                  </Link>
                  <Divider />
                  <Link href="/become-a-host/building">
                    <a>
                      <ListItem onClick={() => setPopupOpened(false)}>
                        숙소 등록
                      </ListItem>
                    </a>
                  </Link>
                  <Link href="/management">
                    <a>
                      <ListItem onClick={() => setPopupOpened(false)}>
                        숙소 관리
                      </ListItem>
                    </a>
                  </Link>
                  <Link href="/me">
                    <a>
                      <ListItem onClick={() => setPopupOpened(false)}>
                        프로필
                      </ListItem>
                    </a>
                  </Link>
                  <Divider />
                  <ListItem onClick={handleLogout}>로그아웃</ListItem>
                </>
              )}
            </List>
          </PopupContainer>
        )}
      </OutsideClickHandler>
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default HeaderMenu;
