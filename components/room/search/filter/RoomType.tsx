import Checkbox from "components/common/Checkbox";
import { roomTypeRadioOptions } from "lib/staticData";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import querystring from "querystring";
import { useDispatch } from "react-redux";
import { roomActions } from "store/room";
import { useSelector } from "store";
import { isEmpty } from "lodash";

interface Props {
  opened: boolean;
  query: string | string[] | undefined;
}

const Container = styled.div`
  margin-right: 10px;
  position: relative;
`;

const Title = styled.div<Props>`
  ${({ opened, query }) =>
    opened || query
      ? css`
          box-shadow: 0 0 0 1px black;
        `
      : css`
          box-shadow: none;
        `}
`;

const List = styled.ul`
  width: 360px;
  background-color: white;
  position: absolute;
  z-index: 2;
  box-shadow: 0px 10px 37px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  top: 55px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  button {
    color: white;
    background-color: ${palette.dark_cyan};
    outline: none;
    border: none;
    padding: 5px 15px;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const Delete = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const RoomType = () => {
  const search = useSelector((state) => state.search);
  const [opened, setOpened] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();

  const handleChange = (value: string[]) => setOptions(value);

  const handleClick = () => {
    dispatch(roomActions.setIsLoading(true));
    router.push(
      `/search/rooms?${querystring.stringify(search)}&${querystring.stringify({
        roomType: options,
      })}`
    );
    setOpened(false);
  };

  // roomType이 하나면 스트링, 두개 이상이면 배열임
  useEffect(() => {
    if (query.roomType) {
      if (query.roomType.length > 3) {
        setOptions([query.roomType as string]);
        return;
      }
      setOptions(query.roomType as string[]);
    }
  }, []);

  const handleDelete = () => setOptions([]);

  const getText = () => {
    if (query.roomType) {
      if (query.roomType.length > 3) {
        switch (query.roomType) {
          case "entire":
            return "집 전체";
          case "private":
            return "개인실";
          case "public":
            return "다인실";
          default:
            return "숙소 유형";
        }
      }
      return "숙소 유형";
    }
    return "숙소 유형";
  };

  return (
    <Container>
      <OutsideClickHandler onOutsideClick={() => setOpened(false)}>
        <Title
          opened={opened}
          className="filter-title"
          onClick={() => setOpened(!opened)}
          query={query.roomType}
        >
          {getText()}
        </Title>
        {opened && (
          <List>
            <Checkbox
              options={roomTypeRadioOptions}
              items={options}
              onChange={handleChange}
            />
            <ButtonContainer>
              <Delete onClick={handleDelete}>지우기</Delete>
              <button onClick={handleClick}>저장</button>
            </ButtonContainer>
          </List>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default RoomType;
