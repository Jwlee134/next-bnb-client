import Header from "components/header";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { IRoomDetail } from "types/room";

const Container = styled.div`
  display: flex;
`;

const ListContainer = styled.div`
  width: 55vw;
  padding: 50px 24px;
`;

const MapContainer = styled.div`
  width: 45vw;
  height: calc(100vh - 80px);
  background-color: burlywood;
  position: sticky;
  top: 80px;
`;

const SearchResults = ({ data }: { data: IRoomDetail[] }) => {
  const { query } = useRouter();
  console.log(data);
  return (
    <>
      <Head>
        <title>{query.value}</title>
      </Head>
      <Header />
      <Container>
        <ListContainer></ListContainer>
        <MapContainer></MapContainer>
      </Container>
    </>
  );
};

export default SearchResults;
