import AdvancedSelector from "components/common/AdvancedSelector";
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
  margin-bottom: 32px;
`;

const Building = () => {
  const { largeBuildingType, buildingType, roomType, isForGuest } = useSelector(
    (state) => state.hosting
  );
  const dispatch = useDispatch();

  const handleLargeBuildingType = ({
    label,
    description,
  }: {
    label: string;
    description: string;
  }) => {
    dispatch(hostingActions.setLargeBuildingType({ label, description }));
    dispatch(
      hostingActions.setBuildingType({ label: null, description: null })
    );
  };

  const detailBuildingTypeList = () => {
    switch (largeBuildingType.label) {
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
      case "부티크 호텔":
        return boutiquesHotelBuildingTypeList;
      default:
        return [];
    }
  };

  const handleDetailBuildingType = ({
    label,
    description,
  }: {
    label: string;
    description: string;
  }) => {
    dispatch(hostingActions.setBuildingType({ label, description }));
  };

  return (
    <>
      <Container>
        <h1>등록하실 숙소 종류는 무엇인가요?</h1>
        <SelectorContainer>
          <AdvancedSelector
            title="숙소의 건물 유형을 선택해주세요."
            options={largeBuildingTypeList}
            value={largeBuildingType.label}
            description={largeBuildingType.description}
            onClick={handleLargeBuildingType}
            isValid={!!largeBuildingType.label}
          />
        </SelectorContainer>
        {largeBuildingType.label && (
          <>
            <SelectorContainer>
              <AdvancedSelector
                title="이제 더 구체적인 유형을 선택해주세요."
                options={detailBuildingTypeList()}
                value={buildingType.label}
                description={buildingType.description}
                onClick={handleDetailBuildingType}
                isValid={!!buildingType.label}
              />
            </SelectorContainer>
            {buildingType.label && (
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
