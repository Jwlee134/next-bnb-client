import Checkbox from "components/common/Checkbox";
import { roomTypeRadioOptions } from "lib/staticData";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { makeQueryString } from "utils";
import { commonActions } from "store/common";
import Footer from "./Footer";

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

const CheckBoxContainer = styled.div`
  padding: 20px 20px 0px;
`;

const RoomType = () => {
  const [opened, setOpened] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();

  const handleChange = (value: string[]) => setOptions(value);

  const handleSave = () => {
    dispatch(commonActions.setIsLoading(true));
    router.push(
      `/search/rooms${makeQueryString({
        ...query,
        page: "1",
        roomType: options,
      })}`
    );
    setOpened(false);
  };

  useEffect(() => {
    if (query.roomType) {
      if (typeof query.roomType === "string") {
        setOptions([query.roomType]);
        return;
      }
      setOptions(query.roomType);
    } else {
      setOptions([]);
    }
  }, [opened, query.roomType]);

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
          <ul className="filter-popup">
            <CheckBoxContainer>
              <Checkbox
                options={roomTypeRadioOptions}
                items={options}
                onChange={handleChange}
              />
            </CheckBoxContainer>
            <Footer handleDelete={handleDelete} handleSave={handleSave}>
              저장
            </Footer>
          </ul>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default RoomType;
