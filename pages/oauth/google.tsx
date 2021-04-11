import { GetServerSideProps } from "next";
import React from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { oauthLoginAPI } from "lib/api/auth";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("components/header"));

const google = () => {
  return <Header useSearchBar={false} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const { data } = await axios({
    url: "https://oauth2.googleapis.com/token",
    method: "post",
    params: {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_BASE_URL
          : process.env.NEXT_PUBLIC_BASE_URL_PROD
      }/oauth/google`,
      code: query.code,
      grant_type: "authorization_code",
    },
  });
  const { data: user } = await axios.get(
    `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${data.access_token}`
  );
  const body = {
    email: user.email,
    name: user.name,
    avatarUrl: user.picture,
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

export default google;
