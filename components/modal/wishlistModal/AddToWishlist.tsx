import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { BsPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { isEmpty } from "lodash";
import { commonActions } from "store/common";
import { addWishItemAPI } from "lib/api/wishlist";
import useWishlist from "hooks/useWishlist";

const Container = styled.div`
  padding: 16px;
  max-height: 468px;
  overflow: auto;
  .wishlist_block {
    display: flex;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: ${palette.gray_f7};
    }
    .wishlist_block_photo {
      width: 64px;
      height: 64px;
      margin-right: 16px;
      border-radius: 6px;
      background-color: ${palette.gray_dd};
      img {
        width: 64px;
        height: 64px;
        object-fit: cover;
        border-radius: 6px;
      }
    }
    .wishlist_block_content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      div:first-child {
        font-size: 18px;
        margin-bottom: 4px;
      }
      div:last-child {
        font-weight: 300;
        font-size: 15px;
      }
    }
    .create_new {
      background-color: ${palette.black};
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const AddToWishlist = ({ closeModal }: { closeModal: () => void }) => {
  const { wishlist, mutateWishlist } = useWishlist();

  const clickedRoomId = useSelector((state) => state.common.clickedRoomId);
  const dispatch = useDispatch();

  const handleCreate = () => dispatch(commonActions.setWishlistMode("create"));

  const handleAdd = async (listId: string) => {
    try {
      await addWishItemAPI({ roomId: clickedRoomId, listId });
      closeModal();
      mutateWishlist();
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <Container>
      <div className="wishlist_block" onClick={handleCreate}>
        <div className="wishlist_block_photo create_new">
          <BsPlus size={40} />
        </div>
        <div className="wishlist_block_content">새로운 위시리스트 만들기</div>
      </div>
      {wishlist?.map((list, i) => (
        <div
          className="wishlist_block"
          key={i}
          onClick={() => handleAdd(list._id)}
        >
          <div className="wishlist_block_photo">
            {!isEmpty(list.list) && <img src={list.list[0].photos[0]} alt="" />}
          </div>
          <div className="wishlist_block_content">
            <div>{list.title}</div>
            <div>
              {isEmpty(list.list) && "저장된 항목 없음"}
              {!isEmpty(list.list) && `숙소 ${list.list.length}개`}
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default AddToWishlist;
