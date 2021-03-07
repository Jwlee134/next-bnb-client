import React from "react";
import RoomDetail from "components/room/detail";
import { GetServerSideProps, NextPage } from "next";
import { getRoomDetailAPI } from "lib/api/room";

const roomDetail: NextPage = ({ data }) => {
  return <RoomDetail room={data} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const { data } = await getRoomDetailAPI(params?.id as string);
    return { props: { data } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default roomDetail;
