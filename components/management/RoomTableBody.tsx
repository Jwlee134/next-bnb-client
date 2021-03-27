import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import styled from "styled-components";
import { IRoom } from "types/room";
import koLocale from "date-fns/locale/ko";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { hostingActions } from "store/hosting";
import palette from "styles/palette";
import { commonActions } from "store/common";
import { addComma, makeQueryString } from "utils";
import { IoIosMore } from "react-icons/io";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "store";
import { deleteRoomAPI } from "lib/api/room";
import { mutate } from "swr";

const Container = styled.tbody`
  img {
    width: 56px;
    height: 40px;
    border-radius: 5px;
    margin-right: 12px;
  }
  tr {
    td {
      &:first-child {
        position: sticky;
        left: 0;
        background-color: white;
        cursor: pointer;
      }
      &:last-child {
        position: relative;
      }
    }
    &:hover {
      td {
        background-color: ${palette.gray_f7};
      }
    }
  }
  .room-table-body_pop-up {
    position: absolute;
    bottom: -60px;
    right: 10px;
    width: 150px;
    background-color: white;
    box-shadow: 0px 2px 16px rgb(0 0 0 / 12%);
    z-index: 1;
    border-radius: 8px;
    > div {
      padding-left: 16px;
      height: 42px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
`;

const RoomTableBody = ({ room, url }: { room: IRoom; url: string }) => {
  const search = useSelector((state) => state.search);
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    dispatch(hostingActions.setState(room));
    dispatch(commonActions.setClickedRoomId(room._id));
    dispatch(commonActions.setHostingMode("update"));
    router.push({
      pathname: "/become-a-host/register",
    });
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠어요?")) {
      await deleteRoomAPI(room._id);
      mutate(`${url}${makeQueryString(query)}`);
    }
  };

  return (
    <Container>
      <tr>
        <td onClick={handleClick}>
          <div>
            <img src={room.photos[0]} alt="" />
            <span>{room.title}</span>
          </div>
        </td>
        <td>
          <div>{room.bedroomCount}</div>
        </td>
        <td>
          <div>{room.bedCount}</div>
        </td>
        <td>
          <div>{room.bathroomCount}</div>
        </td>
        <td>
          <div>
            {room.country} {room.province} {room.city}
          </div>
        </td>
        <td>
          <div>￦{addComma(String(room.price))}</div>
        </td>
        <td>
          <div>
            {formatDistanceToNow(new Date(room.updatedAt), {
              addSuffix: true,
              locale: koLocale,
            })}
          </div>
        </td>
        <td>
          <OutsideClickHandler onOutsideClick={() => setOpened(false)}>
            <div onClick={() => setOpened(!opened)}>
              <IoIosMore />
            </div>
            {opened && (
              <div className="room-table-body_pop-up">
                <div>
                  <a
                    href={`/room/${room._id}${makeQueryString({
                      ...search,
                      value: "",
                      latitude: 0,
                      longitude: 0,
                      children: search.children === 0 ? "0" : search.children,
                      infants: search.infants === 0 ? "0" : search.infants,
                    })}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    미리보기
                  </a>
                </div>
                <div onClick={handleDelete}>삭제</div>
              </div>
            )}
          </OutsideClickHandler>
        </td>
      </tr>
    </Container>
  );
};

export default RoomTableBody;
