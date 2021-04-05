import { getCoordinatesAPI } from "lib/api/location";
import { getPlaceAPI } from "lib/api/place";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { commonActions } from "store/common";
import { searchActions } from "store/search";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import useDebounce from "./useDebounce";

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
  @media ${({ theme }) => theme.device.tabletSmall} {
    position: unset;
    width: 100%;
    box-shadow: none;
    padding: 0px 24px;
    font-weight: 300;
  }
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
  img {
    width: 35px;
    height: 35px;
  }
  div {
    margin-left: 14px;
    max-width: 400px;
  }
`;

const useLocation = (mode: "pc" | "mobile") => {
  const value = useSelector((state) => state.search.value);
  const dispatch = useDispatch();
  const [placeList, setPlaceList] = useState<string[]>([]);

  const keyword = useDebounce(value as string, 500);

  const setValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(searchActions.setValue(e.target.value));

  const searchPlaces = async () => {
    try {
      const { data } = await getPlaceAPI(keyword);
      setPlaceList(data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    if (!keyword) {
      setPlaceList([]);
      return;
    }
    searchPlaces();
  }, [keyword]);

  const handleNear = () => {
    if (mode === "pc") {
      dispatch(commonActions.setShowLocationPopup(false));
      dispatch(commonActions.setIsGettingCoordinates(true));
      document.getElementById("dateRangePicker-start")?.focus();
    } else {
      dispatch(commonActions.setSearchMode("date"));
    }
    dispatch(searchActions.setValue("가까운 여행지 둘러보기"));
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        dispatch(searchActions.setLatitude(latitude));
        dispatch(searchActions.setLongitude(longitude));
        dispatch(commonActions.setIsGettingCoordinates(false));
      },
      () => {
        alert("현재 위치를 불러올 수 없습니다.");
        dispatch(searchActions.setValue(""));
        if (mode === "pc") {
          dispatch(commonActions.setIsGettingCoordinates(false));
        } else {
          dispatch(commonActions.setSearchMode("location"));
        }
      }
    );
  };

  const handleClick = async (value: string) => {
    try {
      if (mode === "pc") {
        dispatch(commonActions.setShowLocationPopup(false));
        dispatch(commonActions.setIsGettingCoordinates(true));
        document.getElementById("dateRangePicker-start")?.focus();
      } else {
        dispatch(commonActions.setSearchMode("date"));
      }
      dispatch(searchActions.setValue(value));
      const {
        data: { lat, lng },
      } = await getCoordinatesAPI(value);
      dispatch(searchActions.setLatitude(lat));
      dispatch(searchActions.setLongitude(lng));
    } catch (error) {
      alert(error.response.data);
    } finally {
      if (mode === "pc") {
        dispatch(commonActions.setIsGettingCoordinates(false));
      }
    }
  };

  const ListItem = () => (
    <ListContainer typing={!!value && isEmpty(placeList)}>
      {!value && (
        <List onClick={handleNear}>
          <img src="/static/image/home/map.png" alt="" />
          <div>가까운 여행지 둘러보기</div>
        </List>
      )}
      {value &&
        !isEmpty(placeList) &&
        placeList.map((place, index) => (
          <List key={index} onClick={() => handleClick(place)}>
            <img src="/static/image/home/map.png" alt="" />
            <div>{place}</div>
          </List>
        ))}
    </ListContainer>
  );

  return { value, setValue, ListItem };
};

export default useLocation;
