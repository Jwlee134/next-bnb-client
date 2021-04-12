import DateRangePicker from "components/common/DateRangePicker";
import useLocation from "hooks/useLocation";
import React, { useState } from "react";
import { useSelector } from "store";
import styled from "styled-components";
import { useRouter } from "next/router";
import Loader from "components/common/Loader";
import Footer from "./Footer";
import Input from "./Input";
import Header from "./Header";
import Guest from "./Guest";

const SearchPopup = styled.div`
  width: 100%;
  position: fixed;
  z-index: 11;
  top: 0;
  min-height: 100vh;
  padding-top: 80px;
  background-color: white;
`;

const Search = ({ scroll }: { scroll: number }) => {
  const searchMode = useSelector((state) => state.common.searchMode);
  const showMap = useSelector((state) => state.map.showMap);
  const isGettingCoordinates = useSelector(
    (state) => state.common.isGettingCoordinates
  );
  const { pathname } = useRouter();
  const { value, setValue, ListItem } = useLocation("mobile");
  const [opened, setOpened] = useState(false);

  if ((pathname === "/search/rooms" && showMap) || pathname === "/room/[id]") {
    return null;
  }

  return (
    <>
      {searchMode === "location" && (
        <Input
          scroll={scroll}
          value={value}
          opened={opened}
          setValue={setValue}
          setOpened={setOpened}
        />
      )}
      {opened && (
        <SearchPopup>
          <Header setOpened={setOpened} />
          {searchMode === "location" && <ListItem />}
          {isGettingCoordinates && <Loader whiteBackground />}
          {searchMode === "date" && (
            <DateRangePicker mode="dayPickerRangeController" />
          )}
          {searchMode === "guest" && <Guest />}
          <Footer setOpened={setOpened} />
        </SearchPopup>
      )}
    </>
  );
};

export default Search;
