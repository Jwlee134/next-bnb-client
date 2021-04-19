import React, { useEffect, useState } from "react";
import { useSelector } from "store";
import rafSchd from "raf-schd";
import useResize from "hooks/useResize";
import { tabletSmallBreakpoint } from "styles/theme";
import PCHeader from "./pcHeader";
import MobileHeader from "./mobileHeader";

const Header = ({ useSearchBar = true }: { useSearchBar?: boolean }) => {
  const innerWidth = useSelector((state) => state.common.innerWidth);

  useResize();

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    if (!useSearchBar) return;

    const handleScroll = (scroll: number) => setScroll(scroll);
    const schedule = rafSchd(handleScroll);

    window.addEventListener("scroll", () => {
      schedule(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        schedule(window.scrollY);
      });
    };
  }, [useSearchBar]);

  if (!innerWidth) return null;
  if (innerWidth >= tabletSmallBreakpoint) {
    return <PCHeader scroll={scroll} useSearchBar={useSearchBar} />;
  }
  return <MobileHeader scroll={scroll} useSearchBar={useSearchBar} />;
};

export default Header;
