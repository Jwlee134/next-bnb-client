import { DefaultTheme } from "styled-components";

export const pcSmallBreakpoint = 1200;
export const tabletBreakpoint = 1024;
export const tabletSmallBreakpoint = 768;
export const mobileBreakpoint = 480;

const theme: DefaultTheme = {
  device: {
    mobile: "screen and (max-width: 479px)",
    tabletSmall: "screen and (max-width:767px)",
    tablet: "screen and (max-width: 1023px)",
    pcSmall: "screen and (max-width: 1199px)",
  },
  maxWidth: {
    wide: "1760px",
    normal: "1280px",
  },
  padding: {
    pc: "0px 80px",
    tablet: "0px 24px",
  },
};

export default theme;
