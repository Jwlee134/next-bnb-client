import Button from "components/common/Button";
import Link from "next/link";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "store";
import styled from "styled-components";
import querystring from "querystring";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import { extractCustomQuery } from "utils";

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

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -12.5px 0 0 -12.5px;
  width: 25px;
  height: 25px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const SearchButton = () => {
  const search = useSelector((state) => state.search);
  const isGettingCoordinates = useSelector(
    (state) => state.common.isGettingCoordinates
  );

  const { pathname, query } = useRouter();
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!search.latitude && !search.longitude) {
      e.preventDefault();
    }
    if (pathname !== "/") {
      dispatch(commonActions.setShowSearchBar(false));
      dispatch(commonActions.setShowMiniSearchBar(true));
      dispatch(commonActions.setScaleDown(true));
      setTimeout(() => {
        dispatch(commonActions.setScaleDown(false));
      }, 100);
    }
  };

  return (
    <Container>
      <Link
        href={`/search/rooms?${querystring.stringify(
          search
        )}${extractCustomQuery(query)}`}
      >
        <a>
          <Button onClick={handleClick}>
            {!isGettingCoordinates && <BiSearch size={24} />}
            {isGettingCoordinates && <Loader />}
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default SearchButton;
