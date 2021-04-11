import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import { commonTitle } from "lib/staticData";
import { api } from "lib/api";
import { mutate } from "swr";
import { IUser } from "types/user";
import Header from "components/header";
import OauthText from "components/common/OauthText";

const Container = styled.div``;

const google = () => {
  const router = useRouter();
  const { query } = router;

  const googleLogin = async () => {
    await mutate("/api/auth/me", async () => {
      const { data } = await api.post<IUser>(
        `/api/oauth/google?code=${query.code}`
      );
      return data;
    });
    router.back();
  };

  useEffect(() => {
    if (!query.code) return;
    googleLogin();
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

export default google;
