import React from "react";
import RoomDetail from "components/room/detail";
import { GetServerSideProps } from "next";
import { getRoomDetailAPI } from "lib/api/room";
import { IRoomDetail } from "types/room";

interface Props {
  data: IRoomDetail;
}

const roomDetail = ({ data }: Props) => {
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
