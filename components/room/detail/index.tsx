import React, { useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
import { IRoomDetail } from "types/room";
import Header from "components/header";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";
import Error from "pages/_error";
import RoomDetailSkeleton from "components/common/RoomDetailSkeleton";
import { IoIosStar, IoMdHeartEmpty } from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";
import palette from "styles/palette";
import Photos from "./Photos";

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  @media screen and (max-width: 1023px) {
    > div {
      padding: 24px 24px !important;
    }
  }
  > div {
    padding: 24px 80px;
    max-width: 1280px;
    margin: 0 auto;
    .detail-title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .detail-subtitle_container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .detail-subtitle_container-left {
        display: flex;
        align-items: center;
        font-size: 14px;
        > span {
          margin: 0px 6px;
        }
        .detail-subtitle_container-rating {
          display: flex;
          align-items: center;
          svg {
            color: ${palette.bittersweet};
            margin-right: 5px;
            margin-bottom: 3px;
          }
          span {
            font-weight: bold;
          }
          span:last-child {
            margin-left: 3px;
            font-weight: 300;
            opacity: 0.7;
          }
        }
        .detail-subtitle_container-address {
          font-weight: 500;
          opacity: 0.7;
        }
      }
      .detail-subtitle_container-right {
        display: flex;
        .detail-small_button {
          display: flex;
          align-items: center;
          cursor: pointer;
          border-radius: 5px;
          padding: 7px 10px;
          font-size: 15px;
          font-weight: 500;
          svg {
            margin-right: 5px;
          }
          &:hover {
            background-color: ${palette.gray_f7};
          }
          span {
            text-decoration: underline;
          }
        }
      }
    }
    .detail-photo_container {
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: cover;
      }
    }
  }
`;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const RoomDetail = () => {
  const router = useRouter();
  const id = router.asPath.split("/").pop()?.split("?")[0];
  const { data, error } = useSWR<IRoomDetail, any>(
    `/api/room/detail?id=${id}`,
    fetcher
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commonActions.setShowMiniSearchBar(true));
    dispatch(commonActions.setShowSearchBar(false));
  }, []);

  if (!id || error) return <Error statusCode={404} />;
  if (!data) {
    return (
      <>
        <Head>
          <title>숙소, 체험, 장소를 모두 한 곳에서 - 에어비앤비</title>
        </Head>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Container>
          <RoomDetailSkeleton />
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <Container>
        <div>
          <div className="detail-title">{data.title}</div>
          <div className="detail-subtitle_container">
            <div className="detail-subtitle_container-left">
              <div className="detail-subtitle_container-rating">
                <IoIosStar size={16} />
                <span>{data.rating}</span>
                <span>({data.review.length})</span>
              </div>
              <span>·</span>
              <div className="detail-subtitle_container-address">
                {data.streetAddress}, {data.city}, {data.province},{" "}
                {data.country}
              </div>
            </div>
            <div className="detail-subtitle_container-right">
              <div className="detail-small_button">
                <IoShareOutline size={18} />
                <span>공유하기</span>
              </div>
              <div className="detail-small_button">
                <IoMdHeartEmpty size={18} />
                <span>저장</span>
              </div>
            </div>
          </div>
          <div className="detail-photo_container">
            <Photos photos={data.photos} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default RoomDetail;
