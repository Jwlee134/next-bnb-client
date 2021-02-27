import React, { useState } from "react";
import styled, { css } from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";
import { IoIosMenu } from "react-icons/io";
import palette from "styles/palette";
import useModal from "hooks/useModal";
import AuthModal from "components/modal/authModal";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";

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
  width: 240px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  top: 50px;
  right: 0;
  cursor: default;
  padding: 6px 0px;
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

const HeaderMenu = () => {
  const [popupOpened, setPopupOpened] = useState(false);
  const { openModal, closeModal, ModalPortal } = useModal();
  const dispatch = useDispatch();

  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <Container
          popupOpened={popupOpened}
          onClick={() => setPopupOpened(!popupOpened)}
        >
          <IoIosMenu size={20} />
          <Image src="/static/image/user/default_user_profile_image.jpg" />
        </Container>
        {popupOpened && (
          <PopupContainer>
            <List>
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
