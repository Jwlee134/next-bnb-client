import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 200vh;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background-image: url("/static/image/home/home.jpg");
  background-position: center center;
  background-size: cover;
`;

const Home = () => {
  return (
    <Container>
      <ImageContainer></ImageContainer>
    </Container>
  );
};

export default Home;
