import { GetServerSideProps } from "next";
import React from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { oauthLoginAPI } from "lib/api/auth";
import { OauthLoginBody } from "types/user";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("components/header"));

const kakao = () => {
  return <Header useSearchBar={false} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const { data } = await axios({
    url: "https://kauth.kakao.com/oauth/token",
    method: "post",
    params: {
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      redirect_uri: `${
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_BASE_URL
          : process.env.NEXT_PUBLIC_BASE_URL_PROD
      }/oauth/kakao`,
      code: query.code,
    },
  });
  const { data: user } = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });
  const {
    properties: { profile_image: avatarUrl },
    kakao_account: {
      email,
      profile: { nickname: name },
    },
  } = user;
  const body: OauthLoginBody = {
    name,
    email,
    avatarUrl,
  };
  const { data: userData } = await oauthLoginAPI(body);
  const token = jwt.sign(userData._id, process.env.JWT_SECRET_KEY!);
  res.setHeader(
    "Set-Cookie",
    `access_token=${token}; path=/; expires=${new Date(
      Date.now() + 60 * 60 * 24 * 1000 * 3
    ).toUTCString()}; httponly`
  );
  res.setHeader("location", "/");
  res.statusCode = 301;
  res.end();
  return { props: {} };
};

export default kakao;
