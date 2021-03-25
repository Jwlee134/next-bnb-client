import Header from "components/header";
import ManagementSkeleton from "components/skeleton/ManagementSkeleton";
import useUser from "hooks/useUser";
import { api } from "lib/api";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import useSWR from "swr";
import { IRoomDetail } from "types/room";
import Error from "pages/_error";
import { makeQueryString } from "utils";
import RoomTableBody from "./RoomTableBody";
import RoomTableHead from "./RoomTableHead";
import SearchInput from "./SearchInput";

const Container = styled.div`
  main {
    padding: 32px 80px;
    .management_title {
      padding-bottom: 16px;
      font-size: 26px;
      font-weight: 500;
    }
    > div:nth-child(3) {
      width: 100%;
      overflow-x: auto;
      table {
        width: 100%;
        white-space: nowrap;
        th {
          &:first-child {
            min-width: 250px;
          }
          padding: 8px;
          font-size: 13px;
          text-align: left;
          font-weight: 500;
          min-width: 100px;
          cursor: pointer;
          border-bottom: 1px solid ${palette.gray_eb};
          color: ${palette.gray_80};
          &:hover {
            color: ${palette.black};
          }
          div {
            display: flex;
            align-items: center;
            svg {
              margin-left: 5px;
            }
          }
          &:first-child {
            position: sticky;
            left: 0;
            background-color: white;
          }
        }
        td {
          padding: 16px 8px;
          border-bottom: 1px solid ${palette.gray_eb};
          vertical-align: middle;
          &:not(:first-child) {
            div {
              font-weight: 300;
            }
          }
          div {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
`;

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const Management = () => {
  const { query } = useRouter();
  const { user } = useUser("/");

  api.defaults.headers.common.user = user?._id;
  const BASE_URL = "/api/room/management";

  const { data, error } = useSWR<IRoomDetail[]>(
    user && user.isLoggedIn ? `${BASE_URL}${makeQueryString(query)}` : null,
    fetcher
  );

  if (error) return <Error statusCode={error.response.status} />;
  return (
    <>
      <Head>
        <title>숙소 관리 · 에어비앤비</title>
      </Head>
      <Container>
        <Header useSearchBar={false} />
        <main>
          <div className="management_title">숙소 {data?.length}개</div>
          <SearchInput data={data} />
          <div>
            <table>
              <RoomTableHead />
              {!data && <ManagementSkeleton />}
              {data?.map((room, i) => (
                <RoomTableBody key={i} room={room} />
              ))}
            </table>
          </div>
        </main>
      </Container>
    </>
  );
};

export default Management;
