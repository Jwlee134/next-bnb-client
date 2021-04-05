import SmallRoomCard from "components/common/SmallRoomCard";
import { fetcher } from "lib/api";
import { isEmpty } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import Error from "pages/_error";
import React from "react";
import { IoIosStar } from "react-icons/io";
import styled from "styled-components";
import palette from "styles/palette";
import useSWR from "swr";
import { IRoom } from "types/room";
import { IUser } from "types/user";
import dynamic from "next/dynamic";
import Reviews from "./reviews";
import UserIntro from "./UserIntro";

const RoomCardSlider = dynamic(
  () => import("components/common/RoomCardSlider")
);

const Container = styled.div`
  .slick-arrow {
    display: block !important;
  }
  .user_main-container {
    max-width: 848px;
    padding: 48px 24px;
    margin: 0 auto;
    .user_main-container_introduction {
      margin-top: 24px;
      pre {
        font-weight: 300;
        line-height: 1.5;
      }
    }
    .user_main-container_section-title {
      border-top: 1px solid ${palette.gray_eb};
      padding: 24px 0px;
      font-size: 24px;
      font-weight: 500;
      display: flex;
      align-items: center;
      svg {
        margin-right: 5px;
        margin-bottom: 2px;
      }
    }
    .user_main-container_rooms {
      margin-top: 48px;
      .slick-prev {
        left: -6px !important;
      }
      .slick-next {
        right: -6px !important;
      }
      .user_main-container_section-rooms {
        display: flex;
        > a {
          width: 33.3%;
        }
      }
    }
    .user_main-container_reviews {
      margin-top: 24px;
    }
  }
`;

const User = () => {
  const { query } = useRouter();

  const { data, error } = useSWR<IUser>(
    query.id ? `/api/user?id=${query.id}` : null,
    fetcher
  );

  if (!data) return null;
  if (error) {
    return (
      <Error statusCode={error.response.status} message={error.response.data} />
    );
  }
  return (
    <>
      <Head>
        <title>{data.name}님의 프로필 · 에어비앤비</title>
      </Head>
      <Container>
        <div className="user_main-container">
          <UserIntro data={data} />
          {data.introduction && (
            <div className="user_main-container_introduction">
              <div className="user_main-container_section-title">소개</div>
              <pre>{data.introduction}</pre>
            </div>
          )}
          {!isEmpty(data.rooms) && (
            <div className="user_main-container_rooms">
              <div className="user_main-container_section-title">
                {data.name}님의 숙소
              </div>
              {data.rooms.length > 3 ? (
                <RoomCardSlider
                  slideToScroll={3}
                  slidesToShow={3}
                  infinite={false}
                >
                  {data.rooms.map((room: IRoom, i: number) => (
                    <SmallRoomCard room={room} key={i} />
                  ))}
                </RoomCardSlider>
              ) : (
                <div className="user_main-container_section-rooms">
                  {data.rooms.map((room: IRoom, i: number) => (
                    <SmallRoomCard room={room} key={i} />
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="user_main-container_reviews">
            <div className="user_main-container_section-title">
              <IoIosStar size={20} />
              후기 {data.reviewFromGuest.length + data.reviewFromHost.length}개
            </div>
            {data.reviewFromGuest.length + data.reviewFromHost.length > 0 && (
              <Reviews user={data} />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default User;