import { NextPage } from "next";
import React from "react";
import axios from "axios";

const kakao: NextPage = () => {
  return <></>;
};

export const getServerSideProps = async ({ query }) => {
  const { data } = await axios.post(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=http://localhost:3000/kakao&code=${query.code}&scope=account_email`
  );
  console.log(data.access_token);
  const { data: user } = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });
  console.log(user);
  return { props: {} };
};

export default kakao;
