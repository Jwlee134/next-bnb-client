import React from "react";
import Navigator from "./navigator";
import Search from "./search";

const MobileHeader = ({
  useSearchBar,
  scroll,
}: {
  useSearchBar: boolean;
  scroll: number;
}) => {
  return (
    <>
      {useSearchBar && <Search scroll={scroll} />}
      <Navigator />
    </>
  );
};

export default MobileHeader;
