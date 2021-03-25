import useModal from "hooks/useModal";
import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { IoCloseSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import OthersModalContents from "../../../modal/filterModal";

const Container = styled.div``;

const Title = styled.div<{ isFiltering: boolean }>`
  ${({ isFiltering }) =>
    isFiltering
      ? css`
          box-shadow: 0 0 0 1px black;
        `
      : css`
          box-shadow: none;
        `}
`;

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
  const { query } = useRouter();
  const { openModal, closeModal, ModalPortal } = useModal();

  return (
    <Container>
      <Title
        isFiltering={
          !!query.bedCount ||
          !!query.bedroomCount ||
          !!query.bathroomCount ||
          !!query.amenities ||
          !!query.spaces ||
          !!query.buildingType
        }
        className="filter-title"
        onClick={() => openModal()}
      >
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
