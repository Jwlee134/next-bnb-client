import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import { commonTitle } from "lib/staticData";
import { api } from "lib/api";
import { mutate } from "swr";
import { IUser } from "types/user";

const Container = styled.div``;

const Header = dynamic(() => import("components/header"));

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
    </Container>
  );
};

export default google;
