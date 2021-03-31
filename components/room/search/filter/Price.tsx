import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { BiWon } from "react-icons/bi";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { addComma, makeQueryString } from "utils";
import { commonActions } from "store/common";
import Footer from "./Footer";

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

const Label = styled.div`
  font-size: 13px;
  font-weight: 300;
  opacity: 0.7;
  margin-bottom: 3px;
`;

const InputItem = styled.label`
  width: 170px;
  height: 56px;
  border: 1px solid ${palette.gray_b0};
  border-radius: 8px;
  padding: 8px;
  position: relative;
`;

const InputBox = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  span {
    margin-left: 0;
    margin-right: 5px;
    display: flex;
    align-items: center;
  }
  svg {
    opacity: 0.7;
  }
`;

const Input = styled.input`
  all: unset;
  font-weight: 300;
  font-size: 15px;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 8px;
  &:focus {
    box-shadow: 0 0 0 1px black;
  }
  padding: 27px 10px 10px 30px;
  box-sizing: border-box;
`;

const Price = () => {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const [opened, setOpened] = useState(false);
  const [minimum, setMinimum] = useState("");
  const [maximum, setMaximum] = useState("");

  const handleSave = () => {
    dispatch(commonActions.setIsLoading(true));
    setOpened(false);
    router.push(
      `/search/rooms${makeQueryString({
        ...query,
        page: "1",
        minPrice: minimum,
        maxPrice: maximum,
      })}`
    );
  };

  const handleDelete = () => {
    setMinimum("");
    setMaximum("");
  };

  const handleMinimum = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMinimum(e.target.value.replace(/[^0-9]/g, ""));

  const handleMaximum = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMaximum(e.target.value.replace(/[^0-9]/g, ""));

  useEffect(() => {
    if (query.minPrice) {
      setMinimum(query.minPrice as string);
    } else {
      setMinimum("");
    }
    if (query.maxPrice) {
      setMaximum(query.maxPrice as string);
    } else {
      setMaximum("");
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
                <InputContainer>
                  <InputItem>
                    <Label>최저 요금</Label>
                    <InputBox>
                      <span>
                        <BiWon />
                      </span>
                      <Input
                        type="text"
                        onChange={handleMinimum}
                        value={addComma(minimum)}
                        maxLength={11}
                      />
                    </InputBox>
                  </InputItem>
                  <span>-</span>
                  <InputItem>
                    <Label>최고 요금</Label>
                    <InputBox>
                      <span>
                        <BiWon />
                      </span>
                      <Input
                        type="text"
                        onChange={handleMaximum}
                        value={addComma(maximum)}
                        maxLength={11}
                      />
                    </InputBox>
                  </InputItem>
                </InputContainer>
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
