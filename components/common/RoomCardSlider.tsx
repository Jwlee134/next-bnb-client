import React from "react";
import Slider from "react-slick";
import styled, { css } from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import { slickPaddingHack, slickStyles } from "styles/slick";

const Container = styled.div<{ pathname: string }>`
  ${slickStyles}
  ${({ pathname }) =>
    pathname === "/wishlists/[id]" &&
    css`
      @media ${({ theme }) => theme.device.pcSmall} {
        ${slickPaddingHack()}
      }
    `}
  @media ${({ theme }) => theme.device.tabletSmall} {
    ${({ pathname }) => pathname !== "/user/[id]" && slickPaddingHack()}
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
  const { pathname } = useRouter();
  return (
    <Container pathname={pathname}>
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
