import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { makeQueryString } from "utils";
import { IoSettingsOutline } from "react-icons/io5";

const Container = styled.th<{ clicked: boolean }>`
  svg {
    z-index: -1;
  }
  ${({ clicked }) =>
    clicked &&
    css`
      color: ${palette.black} !important;
    `}
`;

const RoomTableHead = () => {
  const router = useRouter();
  const { query } = router;

  const headers = [
    "숙소",
    "침실",
    "침대",
    "욕실",
    "위치",
    "가격",
    "최종 수정일",
  ];

  const [asc, setAsc] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [condition, setCondition] = useState("");

  const setText = (index: number) => {
    switch (index) {
      case 0:
        return "title";
      case 1:
        return "bedroomCount";
      case 2:
        return "bedCount";
      case 3:
        return "bathroomCount";
      case 4:
        return "country";
      case 5:
        return "price";
      case 6:
        return "updatedAt";
      default:
        return "";
    }
  };

  const setIndex = (query: string) => {
    switch (query) {
      case "title":
        return 0;
      case "bedroomCount":
        return 1;
      case "bedCount":
        return 2;
      case "bathroomCount":
        return 3;
      case "country":
        return 4;
      case "price":
        return 5;
      case "updatedAt":
        return 6;
      default:
        return 0;
    }
  };

  const handleClick = async (index: number) => {
    setCondition(setText(index));
    if (index !== currentIndex) {
      setAsc(false);
    } else {
      setAsc((prev) => !prev);
    }
    setCurrentIndex(index);
  };

  const getIcon = (index: number) => {
    if (index !== currentIndex) return <TiArrowUnsorted />;
    if (asc) return <TiArrowSortedUp />;
    return <TiArrowSortedDown />;
  };

  useEffect(() => {
    if (!condition) return;
    router.push(
      `/management${makeQueryString({
        ...query,
        sortBy: condition,
        order: asc ? "asc" : "desc",
      })}`
    );
  }, [condition, asc]);

  useEffect(() => {
    if (query.sortBy) setCurrentIndex(setIndex(query.sortBy as string));
    if (query.order === "asc") setAsc(true);
    if (query.order === "desc") setAsc(false);
  }, []);

  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <Container
            key={index}
            onClick={() => handleClick(index)}
            clicked={currentIndex === index}
          >
            <div>
              {header}
              {getIcon(index)}
            </div>
          </Container>
        ))}
        <th>
          <IoSettingsOutline size={16} />
        </th>
      </tr>
    </thead>
  );
};

export default RoomTableHead;
