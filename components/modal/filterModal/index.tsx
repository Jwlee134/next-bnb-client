import Checkbox from "components/common/Checkbox";
import Counter from "components/common/Counter";
import {
  amenityList,
  largeBuildingTypeList,
  roomTypeRadioOptions,
  spaceList,
} from "lib/staticData";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { useSelector } from "store";
import { makeQueryString } from "utils";
import { searchRoomAPI } from "lib/api/room";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import { pcSmallBreakpoint } from "styles/theme";
import PriceInput from "components/room/search/contents/filter/price/PriceInput";
import ModalFooter from "../ModalFooter";
import ModalHeader from "../ModalHeader";

const Container = styled.div`
  padding: 20px 20px 0px 20px;
  width: 767px;
  max-height: 70vh;
  overflow-y: auto;
  .filter-modal_option-title {
    font-size: 18px;
    margin: 20px 0px;
  }
  .filter-modal_options-container {
    border-bottom: 1px solid ${palette.gray_eb};
    &:last-child {
      border-bottom: none;
    }
  }
  .filter-modal_price-container {
    > div:last-child {
      padding: 20px 0px;
      .price-input_item {
        width: 100%;
      }
    }
  }
  .filter-modal_counter-container {
    > div {
      max-width: 100%;
    }
    padding: 10px 0px;
  }
  @media ${({ theme }) => theme.device.tabletSmall} {
    width: 100%;
    max-height: calc(100vh - 144px) !important;
  }
`;

const CheckBoxContainer = styled.div<{ isBuildingType?: boolean }>`
  > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .checkbox_input-container {
      ${({ isBuildingType }) =>
        !isBuildingType &&
        css`
          width: 33.3%;
          &:last-child {
            margin-bottom: 16px;
          }
          @media ${({ theme }) => theme.device.mobile} {
            width: 50%;
          }
        `}
      span {
        margin-left: ${({ isBuildingType }) =>
          isBuildingType ? "16px" : "4px"};
        margin-right: 16px;
        font-weight: 300;
      }
    }
  }
`;

interface IState {
  bedCount: string;
  bedroomCount: string;
  bathroomCount: string;
  amenities: string[];
  spaces: string[];
  buildingType: string[];
  roomType?: string[] | undefined;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
}

const FilterModal = ({ closeModal }: { closeModal: () => void }) => {
  const innerWidth = useSelector((state) => state.common.innerWidth);
  const originalLength = useSelector(
    (state) => state.room.search.originalLength
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const [filterState, setFilterState] = useState<IState>({
    bedCount: "",
    bedroomCount: "",
    bathroomCount: "",
    amenities: [],
    spaces: [],
    buildingType: [],
  });

  const [totalRoomCount, setTotalRoomCount] = useState(originalLength);

  const handleClick = (filter: string, value: number | string[]) => {
    setFilterState({
      ...filterState,
      [filter]: typeof value === "number" ? String(value) : value,
    });
  };

  const handleSave = () => {
    closeModal();
    setTimeout(() => {
      dispatch(commonActions.setIsLoading(true));
      router.push(
        `/search/rooms${makeQueryString({
          ...query,
          ...filterState,
        })}`
      );
    }, 250);
  };

  const handleDelete = () =>
    setFilterState({
      bedCount: "",
      bedroomCount: "",
      bathroomCount: "",
      amenities: [],
      spaces: [],
      buildingType: [],
      ...(innerWidth < pcSmallBreakpoint && { roomType: [] }),
      ...(innerWidth < pcSmallBreakpoint && { minPrice: "" }),
      ...(innerWidth < pcSmallBreakpoint && { maxPrice: "" }),
    });

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const {
          data: { originalLength },
        } = await searchRoomAPI({ ...query, ...filterState });
        setTotalRoomCount(originalLength);
      } catch (error) {
        alert(error.response.data);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [filterState]);

  useEffect(() => {
    const filterList = Object.keys(filterState);
    const obj: { [key: string]: string | string[] | undefined } = {};
    filterList.forEach((filter) => {
      if (query[filter]) {
        if (
          filter === "buildingType" ||
          filter === "amenities" ||
          filter === "spaces" ||
          filter === "roomType"
        ) {
          if (typeof query[filter] === "string") {
            obj[filter] = [query[filter] as string];
            return;
          }
        }
        obj[filter] = query[filter];
      }
    });
    setFilterState({ ...filterState, ...obj });
  }, []);

  useEffect(() => {
    if (innerWidth < pcSmallBreakpoint) {
      setFilterState({
        ...filterState,
        roomType:
          typeof query.roomType === "string"
            ? [query.roomType]
            : query.roomType || [],
        minPrice: (query.minPrice as string) || "",
        maxPrice: (query.maxPrice as string) || "",
      });
    } else {
      const state = { ...filterState };
      delete state.roomType;
      delete state.minPrice;
      delete state.maxPrice;
      setFilterState({ ...state });
    }
  }, [innerWidth]);

  return (
    <>
      <ModalHeader onClick={closeModal}>필터 추가하기</ModalHeader>
      <Container>
        {innerWidth < pcSmallBreakpoint && filterState.roomType && (
          <div className="filter-modal_options-container">
            <div className="filter-modal_option-title" style={{ marginTop: 0 }}>
              숙소 유형
            </div>
            <CheckBoxContainer isBuildingType>
              <Checkbox
                options={roomTypeRadioOptions}
                items={filterState.roomType}
                onChange={(items) => handleClick("roomType", items)}
              />
            </CheckBoxContainer>
          </div>
        )}
        {innerWidth < pcSmallBreakpoint &&
          filterState.minPrice !== undefined &&
          filterState.maxPrice !== undefined && (
            <div className="filter-modal_options-container filter-modal_price-container">
              <div
                className="filter-modal_option-title"
                style={{ marginBottom: 0 }}
              >
                가격
              </div>
              <PriceInput
                minPrice={filterState.minPrice}
                maxPrice={filterState.maxPrice}
                setMinPrice={(value) => {
                  setFilterState({ ...filterState, minPrice: value });
                }}
                setMaxPrice={(value) => {
                  setFilterState({ ...filterState, maxPrice: value });
                }}
              />
            </div>
          )}
        <div className="filter-modal_options-container">
          <div className="filter-modal_option-title">침실과 침대</div>
          <div className="filter-modal_counter-container">
            <Counter
              value={Number(filterState.bedCount)}
              label="침대 수"
              onClick={(value) => handleClick("bedCount", value)}
              disableValue={0}
            />
          </div>
          <div className="filter-modal_counter-container">
            <Counter
              value={Number(filterState.bedroomCount)}
              label="침실 수"
              onClick={(value) => handleClick("bedroomCount", value)}
              disableValue={0}
            />
          </div>
          <div className="filter-modal_counter-container">
            <Counter
              value={Number(filterState.bathroomCount)}
              label="욕실 수"
              onClick={(value) => handleClick("bathroomCount", value)}
              disableValue={0}
            />
          </div>
        </div>
        <div className="filter-modal_options-container">
          <div className="filter-modal_option-title">건물 유형</div>
          <CheckBoxContainer isBuildingType>
            <Checkbox
              options={largeBuildingTypeList}
              items={filterState.buildingType}
              onChange={(value) => handleClick("buildingType", value)}
            />
          </CheckBoxContainer>
        </div>
        <div className="filter-modal_options-container">
          <div className="filter-modal_option-title">편의시설</div>
          <CheckBoxContainer>
            <Checkbox
              options={amenityList}
              items={filterState.amenities}
              onChange={(value) => handleClick("amenities", value)}
            />
          </CheckBoxContainer>
        </div>
        <div className="filter-modal_options-container">
          <div className="filter-modal_option-title">시설</div>
          <CheckBoxContainer>
            <Checkbox
              options={spaceList}
              items={filterState.spaces}
              onChange={(value) => handleClick("spaces", value)}
            />
          </CheckBoxContainer>
        </div>
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

export default FilterModal;
