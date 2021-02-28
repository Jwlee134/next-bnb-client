import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const globalStyles = css`
  ${reset}
  * {
    box-sizing: border-box;
    font-family: Poppins, Noto Sans KR;
  }
  body {
    background-color: white;
    line-height: 1.2;
    font-family: Poppins, Noto Sans KR;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;

const GlobalStyles = createGlobalStyle`
    ${globalStyles}
`;

export default GlobalStyles;
