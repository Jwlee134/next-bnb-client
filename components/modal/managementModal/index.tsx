import { deleteRoomAPI } from "lib/api/room";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "store";
import styled from "styled-components";
import palette from "styles/palette";
import { tabletSmallBreakpoint } from "styles/theme";
import { mutate } from "swr";
import { IRoom } from "types/room";
import { makeQueryString } from "utils";
import { VscPreview, VscTrash } from "react-icons/vsc";
import useUser from "hooks/useUser";
import ModalHeader from "../ModalHeader";

const Container = styled.div`
  width: 400px;
  overflow: hidden;
  border-radius: 12px;
  .management-modal_list-item {
    font-weight: 300;
    padding: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    svg {
      margin-right: 12px;
    }
    &:hover {
      background-color: ${palette.gray_f7};
    }
  }
`;

const ManagementModal = ({
  closeModal,
  room,
  url,
}: {
  closeModal: () => void;
  room: IRoom;
  url: string;
}) => {
  const innerWidth = useSelector((state) => state.common.innerWidth);
  const search = useSelector((state) => state.search);
  const router = useRouter();
  const { user } = useUser();
  const { query } = router;

  const href = `/room/${room._id}${makeQueryString({
    ...search,
    value: "",
    latitude: 0,
    longitude: 0,
    children: search.children === 0 ? "0" : search.children,
    infants: search.infants === 0 ? "0" : search.infants,
  })}`;

  const handleClick = () => {
    closeModal();
    setTimeout(() => {
      router.push(href);
    }, 400);
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠어요?")) {
      if (user) {
        try {
          await deleteRoomAPI({ roomId: room._id, userId: user._id });
          mutate(`${url}${makeQueryString({ ...query, id: user._id })}`);
          closeModal();
        } catch (error) {
          alert(error.response.data);
        }
      }
    }
  };

  return (
    <Container>
      <ModalHeader onClick={closeModal}> </ModalHeader>
      {innerWidth >= tabletSmallBreakpoint ? (
        <a href={href} target="_blank" rel="noreferrer">
          <div className="management-modal_list-item" onClick={closeModal}>
            <VscPreview size={20} />
            미리보기
          </div>
        </a>
      ) : (
        <div className="management-modal_list-item" onClick={handleClick}>
          <VscPreview size={20} />
          미리보기
        </div>
      )}
      <div className="management-modal_list-item" onClick={handleDelete}>
        <VscTrash size={20} />
        삭제
      </div>
    </Container>
  );
};

export default ManagementModal;
