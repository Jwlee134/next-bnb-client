import React from "react";
import styled from "styled-components";
import MainScreen from "./MainScreen";
import SearchCard from "./SearchCard";

const Container = styled.div`
  .home_background-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 40px);
    background-image: url("/static/image/home/home.jpeg");
    background-position: center center;
    background-size: cover;
    z-index: -1;
  }
  .home_contents {
    max-width: ${({ theme }) => theme.maxWidth.wide};
    margin: 0 auto;
    padding: 0px 80px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    .home_contents {
      padding: ${({ theme }) => theme.padding.tablet};
    }
  }
`;

const Home = () => (
  <Container>
    <div className="home_background-img" />
    <div className="home_contents">
      <MainScreen />
      <SearchCard />
    </div>
  </Container>
);

export default Home;
