import useModal from "hooks/useModal";
import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { IoCloseSharp } from "react-icons/io5";
import OthersModalContents from "../../../modal/filterModal";

const Container = styled.div``;

const Title = styled.div``;

const Modal = styled.div`
  width: 568px;
`;

const Header = styled.header`
  height: 65px;
  width: 100%;
  padding: 16px;
  border-bottom: 1px solid ${palette.gray_eb};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  span {
    font-size: 18px;
  }
  svg {
    position: absolute;
    right: 16px;
    cursor: pointer;
  }
`;

const Others = () => {
  const { openModal, closeModal, ModalPortal } = useModal();

  return (
    <Container>
      <Title className="filter-title" onClick={() => openModal()}>
        필터 추가하기
      </Title>
      <ModalPortal>
        <Modal>
          <Header>
            <span>필터 추가하기</span>
            <IoCloseSharp onClick={() => closeModal()} size={22} />
          </Header>
          <OthersModalContents closeModal={closeModal} />
        </Modal>
      </ModalPortal>
    </Container>
  );
};

export default Others;
