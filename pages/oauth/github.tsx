import React, { useEffect } from "react";
import { api } from "lib/api";
import { useRouter } from "next/router";
import { IUser } from "types/user";
import { mutate } from "swr";
import Head from "next/head";
import { commonTitle } from "lib/staticData";
import styled from "styled-components";
import OauthText from "components/common/OauthText";
import Header from "components/header";

const Container = styled.div``;

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
      <OauthText />
    </Container>
  );
};

export default github;
