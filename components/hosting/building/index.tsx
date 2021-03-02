import Selector from "components/common/Selector";
import React, { useMemo } from "react";
import styled from "styled-components";
import {
  apartmentBuildingTypeList,
  bnbBuildingTypeList,
  boutiquesHotelBuildingTypeList,
  houseBuildingTypeList,
  isForGuestOptions,
  largeBuildingTypeList,
  roomTypeRadioOptions,
  secondaryUnitBuildingTypeList,
  uniqueSpaceBuildingTypeList,
} from "lib/staticData";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import { hostingActions } from "store/hosting";
import RadioInput from "components/common/RadioInput";
import Footer from "../Footer";

const Container = styled.div``;

const SelectorContainer = styled.div`
  width: 320px;
  margin-bottom: 32px;
`;

const Building = () => {
  const { largeBuildingType, buildingType, roomType, isForGuest } = useSelector(
    (state) => state.hosting
  );
  const dispatch = useDispatch();

  const buildingTypeList = useMemo(() => {
    switch (largeBuildingType) {
      case "아파트":
        return apartmentBuildingTypeList;
      case "주택":
        return houseBuildingTypeList;
      case "별채":
        return secondaryUnitBuildingTypeList;
      case "독특한 숙소":
        return uniqueSpaceBuildingTypeList;
      case "B&B":
        return bnbBuildingTypeList;
      case "부티크호텔":
        return boutiquesHotelBuildingTypeList;
      default:
        return [];
    }
  }, [largeBuildingType]);

  return (
    <>
      <Container>
        <h1>등록하실 숙소 종류는 무엇인가요?</h1>
        <h2>1단계</h2>
        <SelectorContainer>
          <Selector
            label="우선 범위를 좁혀볼까요?"
            options={largeBuildingTypeList}
            initialValue="옵션을 선택해주세요."
            onChange={(e) => {
              dispatch(hostingActions.setLargeBuildingType(e.target.value));
              dispatch(hostingActions.setBuildingType(null));
            }}
            value={largeBuildingType || "옵션을 선택해주세요."}
            isValid={!!largeBuildingType}
          />
        </SelectorContainer>
        {largeBuildingType && (
          <>
            <SelectorContainer>
              <Selector
                label="건물 유형을 선택하세요."
                initialValue="옵션을 선택해주세요."
                options={buildingTypeList}
                onChange={(e) => {
                  dispatch(hostingActions.setBuildingType(e.target.value));
                }}
                value={buildingType || "옵션을 선택해주세요."}
                isValid={!!buildingType}
              />
            </SelectorContainer>
            {buildingType && (
              <>
                <RadioInput
                  title="게스트가 묵게 될 숙소 유형을 골라주세요."
                  options={roomTypeRadioOptions}
                  currentValue={roomType}
                  onChange={(e) => {
                    dispatch(hostingActions.setRoomType(e.target.value));
                  }}
                  isValid={!!roomType}
                />
                <RadioInput
                  title="게스트만 사용하도록 만들어진 숙소인가요?"
                  options={isForGuestOptions}
                  currentValue={isForGuest}
                  onChange={(e) => {
                    dispatch(hostingActions.setIsForGuest(e.target.value));
                  }}
                  isValid={!!isForGuest}
                />
              </>
            )}
          </>
        )}
      </Container>
      <Footer
        isValid={
          !!largeBuildingType && !!buildingType && !!roomType && !!isForGuest
        }
        nextHref="/become-a-host/bedroom"
      />
    </>
  );
};

export default Building;
