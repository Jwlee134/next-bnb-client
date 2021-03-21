import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { BsPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { wishlistActions } from "store/wishlist";
import { useSelector } from "store";
import { isEmpty } from "lodash";
import { commonActions } from "store/common";
import { IUser, IWishlist } from "types/user";
import { addWishItemAPI } from "lib/api/wishlist";

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
  const user = useSelector((state) => state.user.user as IUser);
  const clickedRoomId = useSelector((state) => state.common.clickedRoomId);
  const dispatch = useDispatch();

  const handleCreate = () => dispatch(commonActions.setWishlistMode("create"));

  const handleAdd = async (listId: string) => {
    try {
      await addWishItemAPI({ roomId: clickedRoomId, listId });
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
      {user &&
        user.wishlist.map((wishlist: IWishlist, i: number) => (
          <div
            className="wishlist_block"
            key={i}
            onClick={() => handleAdd(wishlist._id)}
          >
            <div className="wishlist_block_photo" />
            <div className="wishlist_block_content">
              <div>{wishlist.title}</div>
              <div>
                {isEmpty(wishlist.list) && "저장된 항목 없음"}
                {!isEmpty(wishlist.list) && `숙소 ${wishlist.list.length}개`}
              </div>
            </div>
          </div>
        ))}
    </Container>
  );
};

export default AddToWishlist;
