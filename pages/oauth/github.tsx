import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { api } from "lib/api";
import { useRouter } from "next/router";
import { IUser } from "types/user";
import { mutate } from "swr";
import Head from "next/head";
import { commonTitle } from "lib/staticData";
import styled from "styled-components";

const Container = styled.div``;

const Header = dynamic(() => import("components/header"));

const github = () => {
  const router = useRouter();
  const { query } = router;

  const githubLogin = async () => {
    await mutate("/api/auth/me", async () => {
      const { data } = await api.post<IUser>(
        `/api/oauth/github?code=${query.code}`
      );
      return data;
    });
    router.back();
  };

  useEffect(() => {
    if (!query.code) return;
    githubLogin();
  }, [query]);

  return (
    <Container>
      <Head>
        <title>{commonTitle}</title>
      </Head>
      <Header useSearchBar={false} />
    </Container>
  );
};

export default github;
