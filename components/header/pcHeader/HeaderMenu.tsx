import React, { useContext, useState } from "react";
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
import { isEmpty } from "lodash";
import Notification from "components/common/Notification";
import useNotification from "hooks/useNotification";
import { SocketContext } from "context/Socket";
import { enterKey } from "utils";
import { headerAuthMenu, headerUserMenu } from "lib/staticData";

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
  div {
    border: 2px solid white;
    width: 18px;
    height: 18px;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 21px;
    object-fit: cover;
  }
  ${({ popupOpened }) =>
    popupOpened &&
    css`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
    `}
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
  .popup-container_item {
    position: relative;
    height: 42px;
    display: flex;
    align-items: center;
    padding: 0px 16px;
    cursor: pointer;
    outline: none;
    font-weight: 300;
    &:hover,
    &:focus {
      background-color: ${palette.gray_f7};
    }
    div {
      top: 50%;
      transform: translate(-100%, -50%);
    }
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
  const { socket } = useContext(SocketContext);
  const { reservationLength } = useNotification();

  const [popupOpened, setPopupOpened] = useState(false);

  const { openModal, closeModal, ModalPortal } = useModal();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setPopupOpened(false);
    socket?.emit("logout", { user: user?._id });
    mutateUser(async () => {
      const { data } = await logoutAPI();
      return data;
    }, false);
  };

  const handleAuth = (mode: "login" | "signUp") => {
    openModal();
    setPopupOpened(false);
    dispatch(commonActions.setAuthMode(mode));
  };

  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <Container
          popupOpened={popupOpened}
          onClick={() => setPopupOpened(!popupOpened)}
          onKeyDown={(e) => {
            if (enterKey(e)) {
              setPopupOpened(!popupOpened);
            }
          }}
          role="button"
          aria-label="사용자 메뉴"
          tabIndex={0}
        >
          <IoIosMenu size={20} />
          <img
            src={
              user?.avatarUrl ||
              "/static/image/user/default_user_profile_image.jpg"
            }
            alt="프로필 사진"
          />
          {user?.isLoggedIn && !isEmpty(user.unreadNotifications) && (
            <Notification>{user.unreadNotifications.length}</Notification>
          )}
        </Container>
        {popupOpened && (
          <PopupContainer>
            {!user?.isLoggedIn &&
              headerAuthMenu.map((menu, index) => (
                <div
                  className="popup-container_item"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    handleAuth(menu.value);
                  }}
                  onKeyDown={(e) => {
                    if (enterKey(e)) handleAuth(menu.value);
                  }}
                  key={index}
                >
                  {menu.label}
                </div>
              ))}
            {user?.isLoggedIn && (
              <>
                {headerUserMenu.map((menu, index) => (
                  <>
                    <Link
                      href={
                        menu.label === "프로필"
                          ? `${menu.link}/${user._id}`
                          : menu.link
                      }
                      key={index}
                    >
                      <a
                        className="popup-container_item"
                        role="button"
                        tabIndex={0}
                        onClick={() => setPopupOpened(false)}
                        onKeyDown={(e) => {
                          if (enterKey(e)) setPopupOpened(false);
                        }}
                      >
                        {menu.label}
                        {index === 0 && reservationLength && (
                          <Notification>{reservationLength}</Notification>
                        )}
                      </a>
                    </Link>
                    {(index === 1 || index === 4) && <Divider />}
                  </>
                ))}
                <div
                  className="popup-container_item"
                  role="button"
                  tabIndex={0}
                  onClick={handleLogout}
                  onKeyDown={(e) => {
                    if (enterKey(e)) handleLogout();
                  }}
                >
                  로그아웃
                </div>
              </>
            )}
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
