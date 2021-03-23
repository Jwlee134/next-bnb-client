import axios from "axios";
import Header from "components/header";
import Head from "next/head";
import { useRouter } from "next/router";
import Error from "pages/_error";
import React, { useEffect } from "react";
import { useSelector } from "store";
import styled from "styled-components";
import palette from "styles/palette";
import useSWR from "swr";
import { IRoomDetail } from "types/room";
import RoomTableBody from "./RoomTableBody";
import SearchInput from "./SearchInput";
import RoomTableHead from "./RoomTableHead";

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
        thead {
          th {
            padding: 8px;
            font-size: 13px;
            text-align: left;
            font-weight: 500;
            min-width: 100px;
            cursor: pointer;
            border-bottom: 1px solid ${palette.gray_eb};
            color: ${palette.gray_85};
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
        }
        tbody {
          tr {
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
              &:first-child {
                position: sticky;
                left: 0;
                background-color: white;
                cursor: pointer;
              }
            }
            &:hover {
              td {
                background-color: ${palette.gray_f7};
              }
            }
          }
        }
      }
    }
  }
`;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Management = () => {
  const user = useSelector((state) => state.user.user);
  const { data, error } = useSWR<IRoomDetail[], Error>(
    `/api/room/management?id=${user?._id}`,
    fetcher
  );
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);

  if (error) return <Error statusCode={500} />;
  return (
    <>
      <Head>
        <title>숙소 관리 · 에어비앤비</title>
      </Head>
      <Container>
        <Header useSearchBar={false} />
        <main>
          <div className="management_title">숙소 {data?.length}개</div>
          <SearchInput />
          <div>
            <table>
              <RoomTableHead />
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
