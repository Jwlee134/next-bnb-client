import { css } from "styled-components";
import palette from "./palette";

export const slickStyles = css`
  .slick-disabled {
    visibility: hidden !important;
  }
  .slick-prev {
    left: 10px;
    ::before {
      content: "‹";
      right: 55%;
      transform: translate(55%);
    }
  }
  .slick-next {
    right: 10px;
    ::before {
      content: "›";
      left: 55%;
      transform: translate(-55%);
    }
  }
  .slick-arrow {
    border-radius: 50%;
    display: none !important;
    z-index: 1;
    width: 30px;
    height: 30px;
    background-color: ${palette.gray_f7};
    opacity: 0.8;
    transition: all 0.1s linear;
    &:hover {
      background-color: white;
      opacity: 1;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.18);
    }
    ::before {
      color: black;
      font-size: 30px !important;
      position: absolute;
      top: -3.5px;
    }
  }
`;

export const slickPaddingHack = () => css`
  position: relative;
  padding-top: 66.66%;
  height: 0;
  border-radius: 10px;
  overflow: hidden;
  .slick-slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .slick-list {
      height: 100%;
      .slick-track {
        height: 100%;
        .slick-slide {
          height: 100%;
          > div {
            height: 100%;
            padding-top: 66.66%;
            position: relative;
            img {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
`;
