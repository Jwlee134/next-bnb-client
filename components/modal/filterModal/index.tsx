import Checkbox from "components/common/Checkbox";
import Counter from "components/common/Counter";
import { amenityList, largeBuildingTypeList, spaceList } from "lib/staticData";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { useSelector } from "store";
import { makeQueryString } from "utils";
import { searchRoomAPI } from "lib/api/room";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import ModalFooter from "../ModalFooter";

const Container = styled.div`
  padding: 20px 20px 0px 20px;
  max-height: 70vh;
  overflow-y: auto;
  .filter-counter-container {
    > div {
      max-width: 100%;
    }
    padding: 10px 0px;
  }
`;

const OptionsContainer = styled.div`
  border-bottom: 1px solid ${palette.gray_eb};
  &:last-child {
    border-bottom: none;
  }
`;

const Title = styled.div`
  font-size: 18px;
  margin: 20px 0px;
`;

const CounterContainer = styled.div`
  > div {
    max-width: 100%;
  }
  padding: 10px 0px;
`;

const CheckBoxContainer = styled.div<{ isBuildingType?: boolean }>`
  > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    label {
      &:last-child {
        margin-bottom: 16px;
      }
      span {
        margin-left: ${({ isBuildingType }) =>
          isBuildingType ? "16px" : "4px"};
        margin-right: 16px;
        font-weight: 300;
      }
    }
  }
`;

const OthersModalContents = ({ closeModal }: { closeModal: () => void }) => {
  const originalLength = useSelector(
    (state) => state.room.search.originalLength
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const [bedCount, setBedCount] = useState("");
  const [bedroomCount, setBedroomCount] = useState("");
  const [bathroomCount, setBathroomCount] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [spaces, setSpaces] = useState<string[]>([]);
  const [buildingType, setBuildingType] = useState<string[]>([]);

  const filterObject = {
    bedCount,
    bedroomCount,
    bathroomCount,
    amenities,
    spaces,
    buildingType,
  };

  const [totalRoomCount, setTotalRoomCount] = useState(originalLength);

  const handleBedCount = (value: number) => setBedCount(String(value));
  const handleBedroomCount = (value: number) => setBedroomCount(String(value));
  const handleBathroomCount = (value: number) =>
    setBathroomCount(String(value));
  const handleAmenities = (items: string[]) => setAmenities(items);
  const handleSpaces = (items: string[]) => setSpaces(items);
  const handleBuildingType = (items: string[]) => setBuildingType(items);

  const handleDelete = () => {
    setBedCount("");
    setBedroomCount("");
    setBathroomCount("");
    setAmenities([]);
    setSpaces([]);
    setBuildingType([]);
  };

  const handleSave = () => {
    closeModal();
    setTimeout(() => {
      dispatch(commonActions.setIsLoading(true));
      router.push(
        `/search/rooms${makeQueryString({
          ...query,
          ...filterObject,
        })}`
      );
    }, 250);
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const {
          data: { originalLength },
        } = await searchRoomAPI({ ...query, ...filterObject });
        setTotalRoomCount(originalLength);
      } catch (error) {
        alert(error.response.data);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [bedCount, bedroomCount, bathroomCount, amenities, spaces, buildingType]);

  useEffect(() => {
    if (query.bedCount) setBedCount(query.bedCount as string);
    if (query.bedroomCount) setBedroomCount(query.bedroomCount as string);
    if (query.bathroomCount) setBathroomCount(query.bathroomCount as string);
    if (query.buildingType) {
      if (typeof query.buildingType === "string") {
        setBuildingType([query.buildingType]);
      } else {
        setBuildingType(query.buildingType);
      }
    }
    if (query.amenities) {
      if (typeof query.amenities === "string") {
        setAmenities([query.amenities]);
      } else {
        setAmenities(query.amenities);
      }
    }
    if (query.spaces) {
      if (typeof query.spaces === "string") {
        setSpaces([query.spaces]);
      } else {
        setSpaces(query.spaces);
      }
    }
  }, []);

  return (
    <>
      <Container>
        <OptionsContainer>
          <Title style={{ margin: 0 }}>침실과 침대</Title>
          <CounterContainer>
            <Counter
              value={Number(bedCount)}
              label="침대 수"
              onClick={handleBedCount}
              disableValue={0}
            />
          </CounterContainer>
          <CounterContainer>
            <Counter
              value={Number(bedroomCount)}
              label="침실 수"
              onClick={handleBedroomCount}
              disableValue={0}
            />
          </CounterContainer>
          <CounterContainer>
            <Counter
              value={Number(bathroomCount)}
              label="욕실 수"
              onClick={handleBathroomCount}
              disableValue={0}
            />
          </CounterContainer>
        </OptionsContainer>
        <OptionsContainer>
          <Title>건물 유형</Title>
          <CheckBoxContainer isBuildingType>
            <Checkbox
              options={largeBuildingTypeList}
              items={buildingType}
              onChange={handleBuildingType}
            />
          </CheckBoxContainer>
        </OptionsContainer>
        <OptionsContainer>
          <Title>편의시설</Title>
          <CheckBoxContainer>
            <Checkbox
              options={amenityList}
              items={amenities}
              onChange={handleAmenities}
            />
          </CheckBoxContainer>
        </OptionsContainer>
        <OptionsContainer>
          <Title>시설</Title>
          <CheckBoxContainer>
            <Checkbox
              options={spaceList}
              items={spaces}
              onChange={handleSpaces}
            />
          </CheckBoxContainer>
        </OptionsContainer>
      </Container>
      <ModalFooter
        onButtonClick={handleSave}
        onAbortClick={handleDelete}
        buttonText={`${totalRoomCount}개의 숙소 검색`}
        abortText="지우기"
      />
    </>
  );
};

export default OthersModalContents;
