import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled, { css } from "styled-components";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { makeQueryString } from "utils";
import { commonActions } from "store/common";
import Footer from "../Footer";
import PriceInput from "./PriceInput";

interface Props {
  opened: boolean;
  isFiltering: boolean;
}

const Container = styled.div`
  margin-right: 10px;
  position: relative;
`;

const Title = styled.div<Props>`
  ${({ opened, isFiltering }) =>
    opened || isFiltering
      ? css`
          box-shadow: 0 0 0 1px black;
        `
      : css`
          box-shadow: none;
        `}
`;

const InputContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  span {
    margin: 0px 8px;
  }
  p {
    margin: 0 auto;
    font-weight: 300;
  }
`;

const Price = () => {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const [opened, setOpened] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSave = () => {
    dispatch(commonActions.setIsLoading(true));
    setOpened(false);
    router.push(
      `/search/rooms${makeQueryString({
        ...query,
        page: "1",
        minPrice,
        maxPrice,
      })}`
    );
  };

  const handleDelete = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  useEffect(() => {
    if (query.minPrice) {
      setMinPrice(query.minPrice as string);
    } else {
      setMinPrice("");
    }
    if (query.maxPrice) {
      setMaxPrice(query.maxPrice as string);
    } else {
      setMaxPrice("");
    }
  }, [opened]);

  return (
    <Container>
      <OutsideClickHandler onOutsideClick={() => setOpened(false)}>
        <Title
          opened={opened}
          onClick={() => setOpened(!opened)}
          className="filter-title"
          isFiltering={!!query.minPrice || !!query.maxPrice}
        >
          요금
        </Title>
        {opened && (
          <div className="filter-popup">
            {search.checkIn && search.checkOut && (
              <>
                <PriceInput
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                />
                <Footer handleDelete={handleDelete} handleSave={handleSave}>
                  저장
                </Footer>
              </>
            )}
            {!search.checkIn && !search.checkOut && (
              <InputContainer>
                <p>요금을 설정하려면 여행 날짜를 입력하세요.</p>
              </InputContainer>
            )}
          </div>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default Price;
