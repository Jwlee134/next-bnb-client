import { formatDistanceToNow } from "date-fns";
import React from "react";
import styled from "styled-components";
import { IRoom } from "types/room";
import koLocale from "date-fns/locale/ko";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { hostingActions } from "store/hosting";
import palette from "styles/palette";
import { commonActions } from "store/common";
import { addComma } from "utils";
import { IoIosMore } from "react-icons/io";
import useModal from "hooks/useModal";
import ManagementModal from "components/modal/managementModal";

const Container = styled.tbody`
  img {
    width: 56px;
    height: 40px;
    border-radius: 5px;
    margin-right: 12px;
  }
  .management_tr {
    &:hover {
      .management_td {
        background-color: ${palette.gray_f7};
      }
    }
  }
  .management_td {
    &:first-child {
      cursor: pointer;
      span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    &:last-child {
      position: relative;
    }
  }
`;

const RoomTableBody = ({ room, url }: { room: IRoom; url: string }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { openModal, closeModal, ModalPortal } = useModal();

  const handleClick = () => {
    dispatch(hostingActions.setState(room));
    dispatch(commonActions.setClickedRoomId(room._id));
    dispatch(commonActions.setHostingMode("update"));
    router.push({
      pathname: "/become-a-host/register",
    });
  };

  return (
    <Container>
      <tr className="management_tr">
        <td className="management_td" onClick={handleClick}>
          <div>
            <img src={room.photos[0]} alt="" />
            <span>{room.title}</span>
          </div>
        </td>
        <td className="management_td">
          <div>{room.bedroomCount}</div>
        </td>
        <td className="management_td">
          <div>{room.bedCount}</div>
        </td>
        <td className="management_td">
          <div>{room.bathroomCount}</div>
        </td>
        <td className="management_td">
          <div>
            {room.country} {room.province} {room.city}
          </div>
        </td>
        <td className="management_td">
          <div>￦{addComma(String(room.price))}</div>
        </td>
        <td className="management_td">
          <div>
            {formatDistanceToNow(new Date(room.updatedAt), {
              addSuffix: true,
              locale: koLocale,
            })}
          </div>
        </td>
        <td className="management_td">
          <div onClick={openModal}>
            <IoIosMore />
          </div>
        </td>
      </tr>
      <ModalPortal>
        <ManagementModal room={room} url={url} closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default RoomTableBody;
