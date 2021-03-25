import Button from "components/common/Button";
import Link from "next/link";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "store";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import Loader from "components/common/Loader";
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
  const isGettingCoordinates = useSelector(
    (state) => state.common.isGettingCoordinates
  );

  const { pathname, query } = useRouter();
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!search.value || !search.latitude || !search.longitude) {
      e.preventDefault();
      dispatch(commonActions.setShowLocationPopup(true));
      return;
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
        href={`/search/rooms${makeQueryString({
          ...query,
          id: "",
          zoom: "14",
          coordsBounds: "0.019114425627257958",
        })}`}
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
