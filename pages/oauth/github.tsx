import { GetServerSideProps } from "next";
import React from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { oauthLoginAPI } from "lib/api/auth";

const github = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const { data } = await axios({
    url: "https://github.com/login/oauth/access_token",
    method: "post",
    params: {
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: query.code,
    },
    headers: {
      Accept: "application/json",
    },
  });
  const { data: user } = await axios({
    url: "https://api.github.com/user",
    method: "get",
    headers: {
      Authorization: `token ${data.access_token}`,
    },
  });
  const body = {
    name: user.name,
    email: user.email,
    avatarUrl: user.avatar_url,
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

export default github;
