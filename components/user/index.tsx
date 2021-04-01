import RoomCardSlider from "components/common/RoomCardSlider";
import SmallRoomCard from "components/common/SmallRoomCard";
import Header from "components/header";
import useUser from "hooks/useUser";
import { api } from "lib/api";
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
import EditProfile from "./EditProfile";
import Reviews from "./reviews";

const Container = styled.div`
  header {
    > div {
      padding: 0px 120px;
    }
  }
  .slick-arrow {
    display: block !important;
  }
  .user_main-container {
    max-width: 848px;
    padding: 48px 24px;
    margin: 0 auto;
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
    .user_main-container_profile {
      display: flex;
      img {
        min-width: 128px;
        width: 128px;
        height: 128px;
        border-radius: 50%;
        margin-right: 24px;
      }
      > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        div:first-child {
          font-size: 34px;
          font-weight: 500;
        }
        div:nth-child(2) {
          opacity: 0.7;
          font-weight: 300;
          margin-top: 5px;
        }
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

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const User = () => {
  const { query } = useRouter();
  const { user } = useUser();
  const { data, error } = useSWR<IUser>(`/api/user?id=${query.id}`, fetcher);

  if (error) {
    return (
      <Error statusCode={error.response.status} message={error.response.data} />
    );
  }
  if (!data) return null;
  return (
    <>
      <Head>
        <title>{data.name}님의 프로필 · 에어비앤비</title>
      </Head>
      <Container>
        <Header useSearchBar={false} />
        <div className="user_main-container">
          <div className="user_main-container_profile">
            <img src={data.avatarUrl} alt="" />
            <div>
              <div>안녕하세요. 저는 {data.name}입니다.</div>
              <div>회원가입: {new Date(data.createdAt).getFullYear()}</div>
              {user?._id === data._id && <EditProfile />}
            </div>
          </div>
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
