import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { searchRoomAPI } from "lib/api/room";
import { roomActions } from "store/room";
import { extractKeywords } from "utils";
import { searchActions } from "store/search";
import { wrapper } from "store";
import { commonActions } from "store/common";
import dynamic from "next/dynamic";

const SearchResults = dynamic(() => import("components/room/search"));
const Error = dynamic(() => import("pages/_error"));

interface Props {
  error?: number | null;
}

const rooms: NextPage<Props> = ({ error }) => {
  if (error) return <Error statusCode={error} />;
  return <SearchResults />;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store, query }) => {
    try {
      const keywords = extractKeywords(query);
      store.dispatch(
        searchActions.setSearch({
          ...keywords,
          adults: Number(keywords.adults) < 1 ? 1 : Number(keywords.adults),
          children:
            Number(keywords.children) < 0 ? 0 : Number(keywords.children),
          infants: Number(keywords.infants) < 0 ? 0 : Number(keywords.infants),
        })
      );
      store.dispatch(commonActions.setShowSearchBar(false));
      store.dispatch(commonActions.setShowMiniSearchBar(true));

      const { data } = await searchRoomAPI(query);
      store.dispatch(roomActions.setSearchResults(data));
      return { props: { error: null } };
    } catch (error) {
      return { props: { error: error.response.status } };
    }
  }
);

export default rooms;
