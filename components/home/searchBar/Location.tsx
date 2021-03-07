import useDebounce from "hooks/useDebounce";
import { getPlaceAPI } from "lib/api/place";
import { isEmpty } from "lodash";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled, { css } from "styled-components";
import palette from "styles/palette";

const Label = styled.label``;

const Input = styled.input`
  all: unset;
  cursor: text;
  &::placeholder {
    font-size: 14px;
  }
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ListContainer = styled.ul<{ typing: boolean }>`
  position: absolute;
  width: 500px;
  background-color: white;
  border-radius: 32px;
  top: 80px;
  box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.15), 0px 3px 8px rgba(0, 0, 0, 0.1);
  padding: 18px 0px;
  ${({ typing }) =>
    typing &&
    css`
      display: none;
    `}
`;

const List = styled.li`
  border-radius: 12px;
  height: 56px;
  &:hover {
    background-color: ${palette.gray_f7};
  }
  display: flex;
  align-items: center;
  padding: 0px 18px;
  cursor: pointer;
`;

const Text = styled.span`
  margin-left: 14px;
  max-width: 400px;
`;

const Location = () => {
  const [popupOpened, setPopupOpened] = useState(false);
  const [value, setValue] = useState("");
  const [placeList, setPlaceList] = useState<string[]>([]);

  const keyword = useDebounce(value, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleNear = () => {
    setPopupOpened(false);
    setValue("가까운 여행지 둘러보기");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
      },
      (err) => {
        alert(err.message);
        setValue("");
      }
    );
  };

  const searchPlaces = async () => {
    try {
      const { data } = await getPlaceAPI(keyword);
      setPlaceList(data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    if (keyword) setPlaceList([]);
    searchPlaces();
  }, [keyword]);

  return (
    <div className="search-container">
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <Label onClick={() => setPopupOpened(true)}>
          <div
            className={`search-item ${
              popupOpened && "search-item-popup-opened"
            }`}
          >
            <h3 className="search-text">위치</h3>
            <Input
              value={value}
              onChange={handleChange}
              placeholder="어디로 여행가세요?"
            />
          </div>
        </Label>
        {popupOpened && (
          <ListContainer typing={!!value && isEmpty(placeList)}>
            {!value && (
              <List onClick={handleNear}>
                <Image
                  src="/static/image/home/map.png"
                  width="37"
                  height="37"
                />
                <Text>가까운 여행지 둘러보기</Text>
              </List>
            )}
            {value &&
              !isEmpty(placeList) &&
              placeList.map((place, index) => (
                <List key={index}>
                  <Image
                    src="/static/image/home/map.png"
                    width="37"
                    height="37"
                  />
                  <Text>{place}</Text>
                </List>
              ))}
          </ListContainer>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default Location;
