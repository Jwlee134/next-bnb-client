import ManagementSkeleton from "components/skeleton/ManagementSkeleton";
import useUser from "hooks/useUser";
import { fetcher } from "lib/api";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import useSWR from "swr";
import { IRoom } from "types/room";
import Error from "pages/_error";
import { makeQueryString } from "utils";
import RoomTableBody from "./RoomTableBody";
import RoomTableHead from "./RoomTableHead";
import SearchInput from "./SearchInput";

const Container = styled.div`
  .management_main {
    padding: 32px 80px;
    min-height: calc(100vh - 80px);
  }
  .management_title {
    padding-bottom: 16px;
    font-size: 26px;
    font-weight: 500;
    height: 50px;
  }
  .management_main_table-container {
    width: 100%;
    overflow-x: auto;
  }
  .management_table {
    width: 100%;
    white-space: nowrap;
  }
  .management_th {
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
    &:last-child {
      width: 30px;
      min-width: 30px;
      position: relative;
      svg {
        position: absolute;
        top: 7.5px;
      }
    }
  }
  .management_th_title {
    display: flex;
    align-items: center;
    svg {
      margin-left: 5px;
    }
  }
  .management_td {
    padding: 16px 8px;
    border-bottom: 1px solid ${palette.gray_eb};
    vertical-align: middle;
    &:not(:first-child) {
      div {
        font-weight: 300;
      }
    }
    > div {
      display: flex;
      align-items: center;
    }
    &:last-child {
      div {
        cursor: pointer;
        div {
          &:first-child {
            display: flex;
          }
        }
      }
    }
  }
  .management_th,
  .management_td {
    &:first-child {
      max-width: 500px;
      width: 500px;
      position: sticky;
      left: 0;
      background-color: white;
    }
  }
  @media ${({ theme }) => theme.device.pcSmall} {
    .management_main {
      padding: 32px 24px;
    }
    .management_th,
    .management_td {
      &:first-child {
        position: initial;
      }
    }
  }
  @media ${({ theme }) => theme.device.tabletSmall} {
    .management_th,
    .management_td {
      &:first-child {
        min-width: initial;
        max-width: 300px;
      }
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    .management_main {
      padding: 32px 0px;
    }
    .management_main_text-input-container {
      padding: 0px 24px;
    }
    .management_th:first-child,
    .management_td:first-child {
      padding-left: 24px;
    }
    .management_th:last-child,
    .management_td:last-child {
      padding-right: 24px;
    }
    .filter_input-container,
    input {
      width: 100%;
    }
  }
`;

const Management = () => {
  const { query } = useRouter();
  const { user } = useUser("/");

  const BASE_URL = "/api/room/management";

  const { data, error } = useSWR<IRoom[]>(
    user && user.isLoggedIn
      ? `${BASE_URL}${makeQueryString({ ...query, id: user._id })}`
      : null,
    fetcher
  );

  if (error) return <Error statusCode={error.response.status} />;
  return (
    <>
      <Container>
        <main className="management_main">
          <div className="management_main_text-input-container">
            <div className="management_title">숙소 {data?.length}개</div>
            <SearchInput data={data} />
          </div>
          <div className="management_main_table-container">
            <table className="management_table">
              <RoomTableHead />
              {!data && <ManagementSkeleton />}
              {data?.map((room, i) => (
                <RoomTableBody url={BASE_URL} key={i} room={room} />
              ))}
            </table>
          </div>
        </main>
      </Container>
    </>
  );
};

export default Management;
