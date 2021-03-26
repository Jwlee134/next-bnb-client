import Header from "components/header";
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
  height: calc(100vh - 40px);
  background-image: url("/static/image/home/home.jpeg");
  background-position: center center;
  background-size: cover;
  z-index: -1;
`;

const Contents = styled.div`
  padding-bottom: 32px;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LabelContainer = styled.div`
  width: 100%;
  max-width: 1760px;
  padding: 0px 80px;
  margin: 0 auto;
  height: calc(100% - 72px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  float: bottom;
`;

const Label = styled.h1`
  font-size: 56px;
  font-weight: 500;
  color: white;
  text-shadow: 0px 0px 3px #000000;
`;

const Button = styled.button`
  border: 0;
  outline: 0;
  background-color: white;
  width: 170px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 10px;
  margin-top: 12px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #ececec;
  }
`;

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <ImageContainer />
        <Contents>
          <div />
          <LabelContainer>
            <Label>
              이제, 여행은
              <br /> 가까운 곳에서
            </Label>
            <Button>근처의 숙소 둘러보기</Button>
          </LabelContainer>
        </Contents>
      </Container>
    </>
  );
};

export default Home;
