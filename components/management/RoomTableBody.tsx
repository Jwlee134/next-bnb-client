import { formatDistanceToNow } from "date-fns";
import React from "react";
import styled from "styled-components";
import { IRoomDetail } from "types/room";
import koLocale from "date-fns/locale/ko";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { hostingActions } from "store/hosting";

const Container = styled.tbody`
  img {
    width: 56px;
    height: 40px;
    border-radius: 5px;
    margin-right: 12px;
  }
`;

const RoomTableBody = ({ room }: { room: IRoomDetail }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(hostingActions.setState(room));
    router.push({
      pathname: "/become-a-host/register",
      query: {
        modify: true,
      },
    });
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
          <div>
            {formatDistanceToNow(new Date(room.updatedAt), {
              addSuffix: true,
              locale: koLocale,
            })}
          </div>
        </td>
      </tr>
    </Container>
  );
};

export default RoomTableBody;
