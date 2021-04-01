import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import palette from "styles/palette";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
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

const RoomCardSlider = ({
  children,
  slideToScroll = 1,
  slidesToShow = 1,
  infinite = true,
}: {
  children: React.ReactNode;
  slideToScroll?: number;
  slidesToShow?: number;
  infinite?: boolean;
}) => {
  return (
    <Container>
      <Slider
        slidesToScroll={slideToScroll}
        slidesToShow={slidesToShow}
        infinite={infinite}
      >
        {children}
      </Slider>
    </Container>
  );
};

export default RoomCardSlider;
