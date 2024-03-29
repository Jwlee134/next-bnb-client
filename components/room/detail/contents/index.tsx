import useRoom from "hooks/useRoom";
import { isEmpty } from "lodash";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { useSelector } from "store";
import styled from "styled-components";
import palette from "styles/palette";
import { mobileBreakpoint } from "styles/theme";
import { getRoomTypeText } from "utils";
import Bed from "../../../../public/static/svg/room/bed.svg";

const Amenity = dynamic(() => import("./Amenity"));

const Container = styled.div`
  .main-container_left_title_avatar-url {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${palette.gray_dd};
    padding-bottom: 24px;
    div {
      div:last-child {
        font-weight: 300;
      }
    }
    a {
      width: 56px;
      min-width: 56px;
      height: 56px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .main-container_left_description {
    padding: 24px 0px;
    border-bottom: 1px solid ${palette.gray_dd};
    line-height: 1.5;
    font-weight: 300;
    white-space: pre-wrap;
  }
  .main-container_left_bed-type {
    padding: 48px 0px 24px 0px;
    border-bottom: 1px solid ${palette.gray_dd};
    > div:last-child {
      display: flex;
      flex-wrap: wrap;
      .bed-type_container {
        border: 1px solid ${palette.gray_dd};
        border-radius: 12px;
        padding: 24px;
        width: calc(33% - 16px);
        margin-right: 24px;
        margin-bottom: 24px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        svg {
          margin-bottom: 12px;
        }
        div:last-child {
          font-size: 15px;
          margin-top: 6px;
          font-weight: 300;
        }
      }
    }
  }
  .main-container_left_amenities {
    padding: 48px 0px 36px 0px;
    border-bottom: 1px solid ${palette.gray_dd};
    > div:first-child {
      font-size: 24px;
      font-weight: 500;
      padding-bottom: 24px;
    }
    > div:last-child {
      display: flex;
      flex-wrap: wrap;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    .bed-type_container {
      width: calc(50% - 12px) !important;
      &:nth-child(2n) {
        margin-right: 0px !important;
      }
      &:nth-child(3n) {
        margin-right: 24px !important;
      }
    }
  }
`;

const Contents = () => {
  const { room } = useRoom();
  const innerWidth = useSelector((state) => state.common.innerWidth);

  const bedTypeCount = (i: number) =>
    room?.bedType[i].beds
      .map((bed) => `${bed.label} ${bed.count}개`)
      .join(", ");

  const publicBedTypeCount = () =>
    room?.publicBedType.map((bed) => `${bed.label} ${bed.count}개`).join(", ");

  if (!room) return null;
  return (
    <Container>
      <div className="main-container_left_title_avatar-url">
        <div>
          <div className="detail_content-title" style={{ paddingBottom: 5 }}>
            {innerWidth > mobileBreakpoint ? (
              ` ${room.creator.name}님이 호스팅하는 ${
                room.largeBuildingType.label
              }${" "}
            ${getRoomTypeText(room)}`
            ) : (
              <div>
                {room.largeBuildingType.label} {getRoomTypeText(room)}
                <div>호스트: {room.creator.name}님</div>
              </div>
            )}
          </div>
          <div className="detail_content-room-info">
            최대 인원 {room.maximumGuestCount}명 · 침실 {room.bedroomCount}개 ·
            침대 {room.bedCount}개 · 욕실 {room.bathroomCount}개
          </div>
        </div>
        <Link href={`/user/${room.creator._id}`}>
          <a>
            <img src={room.creator.avatarUrl} alt="" />
          </a>
        </Link>
      </div>
      <pre className="main-container_left_description">{room.description}</pre>
      <div className="main-container_left_bed-type">
        <div className="detail_content-title">침대/침구 유형</div>
        <div>
          {room.bedType.map((bedroom, i) => (
            <div className="bed-type_container" key={i}>
              <div>
                <Bed />
              </div>
              <div>{bedroom.id}번 침실</div>
              <div>{bedTypeCount(i)}</div>
            </div>
          ))}
          <div className="bed-type_container">
            <div>
              <Bed />
            </div>
            <div>공용 공간</div>
            <div>{publicBedTypeCount()}</div>
          </div>
        </div>
      </div>
      {!isEmpty(room.amenities) && (
        <div className="main-container_left_amenities">
          <div className="detail_content-title">편의시설</div>
          <div>
            {room.amenities.map((amenity, i) => (
              <Amenity amenity={amenity} key={i} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Contents;
