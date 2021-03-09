import Button from "components/common/Button";
import Link from "next/link";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "store";
import styled from "styled-components";
import { makeQueryString } from "utils";

const Container = styled.div`
  button {
    width: 48px;
    position: absolute;
    right: 8px;
    top: 8px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.1s linear;
    &:hover {
      background-color: #e44e53;
    }
  }
`;

const SearchButton = () => {
  const search = useSelector((state) => state.search);

  const queryUrl = makeQueryString("/search/rooms", search);

  return (
    <Container>
      <Link href={queryUrl}>
        <a>
          <Button>
            <BiSearch size={24} />
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default SearchButton;
