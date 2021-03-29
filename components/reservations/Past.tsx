import React from "react";
import styled from "styled-components";
import { IUser } from "types/user";

const Container = styled.div``;

const Past = ({
  setError,
  user,
}: {
  setError: React.Dispatch<
    React.SetStateAction<{
      code: number | null;
      message: string;
    }>
  >;
  user: IUser | undefined;
}) => {
  return <Container></Container>;
};

export default Past;
