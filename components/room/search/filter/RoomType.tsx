import Checkbox from "components/common/Checkbox";
import { roomTypeRadioOptions } from "lib/staticData";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import querystring from "querystring";
import { searchRoomAPI } from "lib/api/room";
import { useDispatch } from "react-redux";
import { roomActions } from "store/room";

const Container = styled.div`
  margin-right: 10px;
  position: relative;
`;

const Title = styled.div<{ opened: boolean }>`
  ${({ opened }) =>
    opened &&
    css`
      box-shadow: 0 0 0 1px black;
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
  span {
    text-decoration: underline;
    cursor: pointer;
  }
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

const RoomType = () => {
  const [opened, setOpened] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [queryString, setQueryString] = useState("");
  const router = useRouter();
  const { query } = router;

  const dispatch = useDispatch();

  const handleChange = (value: string[]) => setOptions(value);

  const handleClick = () => {
    dispatch(roomActions.setIsLoading(true));
    if (query.roomType) delete query.roomType;
    router.push(`/search/rooms?${querystring.stringify(query)}${queryString}`);
    setOpened(false);
  };

  useEffect(() => {
    setQueryString(`&${querystring.stringify({ roomType: options })}`);
  }, [options]);

  useEffect(() => {}, []);

  return (
    <Container>
      <OutsideClickHandler onOutsideClick={() => setOpened(false)}>
        <Title
          opened={opened}
          className="filter-title"
          onClick={() => setOpened(!opened)}
        >
          숙소 유형
        </Title>
        {opened && (
          <List>
            <Checkbox
              options={roomTypeRadioOptions}
              items={options}
              onChange={handleChange}
            />
            <ButtonContainer>
              <span>지우기</span>
              <button onClick={handleClick}>저장</button>
            </ButtonContainer>
          </List>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default RoomType;
