import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { searchRoomAPI } from "lib/api/room";
import { roomActions } from "store/room";
import { extractKeywords } from "utils";
import { searchActions } from "store/search";
import { wrapper } from "store";
import { commonActions } from "store/common";
import dynamic from "next/dynamic";
import Header from "components/header";
import SearchResults from "components/room/search";
import Head from "next/head";

const Error = dynamic(() => import("pages/_error"));

interface Props {
  error?: { statusCode: number; message: string } | null;
  value: string;
}

const RoomsPage: NextPage<Props> = ({ error, value }) => {
  if (error) {
    return <Error statusCode={error.statusCode} message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>{value} - 숙소 - 에어비앤비</title>
      </Head>
      <Header />
      <SearchResults />
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store, query }) => {
    const { adults, children, infants, page } = query;
    if (
      Number(adults) < 1 ||
      Number(children) < 0 ||
      Number(infants) < 0 ||
      Number(page) < 1
    ) {
      return {
        props: {
          error: {
            statusCode: 400,
            message: "유효하지 않은 검색값입니다.",
          },
        },
      };
    }
    try {
      const keywords = extractKeywords(query);
      store.dispatch(searchActions.setSearch({ ...keywords }));
      store.dispatch(commonActions.setShowSearchBar(false));
      store.dispatch(commonActions.setShowMiniSearchBar(true));

      const { data } = await searchRoomAPI(query);
      store.dispatch(roomActions.setSearchResults(data));
      return { props: { value: query.value, error: null } };
    } catch (error) {
      return {
        props: {
          error: {
            statusCode: 500,
            message:
              "웹페이지를 표시할 수 없습니다. 관리자에게 문의하세요. (sorhd134@gmail.com)",
          },
        },
      };
    }
  });

export default RoomsPage;
