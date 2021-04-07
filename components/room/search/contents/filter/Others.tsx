import useModal from "hooks/useModal";
import React from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import FilterModal from "components/modal/filterModal";

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
        onClick={openModal}
      >
        필터 추가하기
      </Title>
      <ModalPortal>
        <FilterModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Others;
