import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { IRoomDetail } from "types/room";

const Container = styled.div``;

const RoomDetail = ({ room }: { room: IRoomDetail }) => {
  return (
    <>
      <Head>
        <title>{room.title}</title>
      </Head>
      <Container>
        <div>Hello world</div>
        {!room && <div>no Room</div>}
        <pre>{room.description}</pre>
      </Container>
    </>
  );
};

export default RoomDetail;
