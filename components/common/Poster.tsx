import React from "react";
import styled from "styled-components";

interface Props {
  item: {
    title: string;
    idList: string[];
  };
}

const Container = styled.div`
  width: calc(33.3% - 21px);
  height: 300px;
  margin-right: 32px;
  transition: box-shadow 0.1s linear;
  margin-bottom: 32px;
  box-shadow: 0px 6px 16px rgb(0 0 0 / 12%);
  border-radius: 12px;
  &:nth-child(3n) {
    margin-right: 0;
  }
  &:hover {
    box-shadow: 0px 6px 20px rgb(0 0 0 / 20%);
  }
`;

const Poster = ({ item }: Props) => {
  return <Container></Container>;
};

export default Poster;
