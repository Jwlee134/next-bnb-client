import useDebounce from "hooks/useDebounce";
import { getCoordinatesAPI } from "lib/api/location";
import { getPlaceAPI } from "lib/api/place";
import { isEmpty } from "lodash";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { commonActions } from "store/common";
import { searchActions } from "store/search";
import styled, { css } from "styled-components";
import palette from "styles/palette";

const Input = styled.input`
  all: unset;
  cursor: text;
  font-size: 14px;
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
  const value = useSelector((state) => state.search.value);
  const showLocationPopup = useSelector(
    (state) => state.common.showLocationPopup
  );
  const [placeList, setPlaceList] = useState<string[]>([]);

  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const keyword = useDebounce(text as string, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleNear = () => {
    dispatch(commonActions.setShowLocationPopup(false));
    dispatch(commonActions.setIsGettingCoordinates(true));
    document.getElementById("dateRangePicker-start")?.focus();
    setText("가까운 여행지 둘러보기");
    dispatch(searchActions.setValue("가까운 여행지 둘러보기"));
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        dispatch(searchActions.setLatitude(latitude));
        dispatch(searchActions.setLongitude(longitude));
        dispatch(commonActions.setIsGettingCoordinates(false));
      },
      (err) => {
        alert(err.message);
        dispatch(searchActions.setValue(""));
        dispatch(commonActions.setIsGettingCoordinates(false));
      }
    );
  };

  const handleClick = async (value: string) => {
    try {
      dispatch(commonActions.setShowLocationPopup(false));
      dispatch(commonActions.setIsGettingCoordinates(true));
      document.getElementById("dateRangePicker-start")?.focus();
      setText(value);
      dispatch(searchActions.setValue(value));
      const {
        data: { lat, lng },
      } = await getCoordinatesAPI(value);
      dispatch(searchActions.setLatitude(lat));
      dispatch(searchActions.setLongitude(lng));
    } catch (error) {
      alert(error.response.data);
    } finally {
      dispatch(commonActions.setIsGettingCoordinates(false));
    }
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
    if (!keyword) setPlaceList([]);
    if (keyword) searchPlaces();
  }, [keyword]);

  useEffect(() => {
    if (!text) setText(value);
    return () => {
      setPlaceList([]);
    };
  }, []);

  return (
    <div className="search-container">
      <OutsideClickHandler
        onOutsideClick={() => {
          dispatch(commonActions.setShowLocationPopup(false));
        }}
      >
        <label>
          <div
            className={`search-item ${
              showLocationPopup && "search-item-popup-opened"
            }`}
          >
            <h3 className="search-text">위치</h3>
            <Input
              onClick={() => dispatch(commonActions.setShowLocationPopup(true))}
              value={text}
              onChange={handleChange}
              placeholder="어디로 여행가세요?"
            />
          </div>
        </label>
        {showLocationPopup && (
          <ListContainer typing={!!text && isEmpty(placeList)}>
            {!text && (
              <List onClick={handleNear}>
                <Image
                  src="/static/image/home/map.png"
                  width="35"
                  height="35"
                />
                <Text>가까운 여행지 둘러보기</Text>
              </List>
            )}
            {text &&
              !isEmpty(placeList) &&
              placeList.map((place, index) => (
                <List key={index} onClick={() => handleClick(place)}>
                  <Image
                    src="/static/image/home/map.png"
                    width="35"
                    height="35"
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
