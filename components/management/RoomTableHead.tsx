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
import { managementHeaders } from "lib/staticData";

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

  const [asc, setAsc] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  const handleClick = (value: string) => {
    setCurrentValue(value);
    if (value !== currentValue) {
      setAsc(false);
    } else {
      setAsc((prev) => !prev);
    }
  };

  const getIcon = (value: string) => {
    if (value !== currentValue) return <TiArrowUnsorted />;
    if (asc) return <TiArrowSortedUp />;
    return <TiArrowSortedDown />;
  };

  useEffect(() => {
    if (!currentValue) return;
    router.push(
      `/management${makeQueryString({
        ...query,
        sortBy: currentValue,
        order: asc ? "asc" : "desc",
      })}`
    );
  }, [currentValue, asc]);

  useEffect(() => {
    if (query.sortBy) setCurrentValue(query.sortBy as string);
    if (query.order === "asc") setAsc(true);
    if (query.order === "desc") setAsc(false);
  }, []);

  return (
    <thead>
      <tr>
        {managementHeaders.map((header, index) => (
          <Container
            key={index}
            onClick={() => handleClick(header.value)}
            clicked={currentValue === header.value}
          >
            <div>
              {header.label}
              {getIcon(header.value)}
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
