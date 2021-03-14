import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import palette from "styles/palette";

const Container = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  border-top: 1px solid ${palette.gray_eb};
  padding: 24px 0px;
`;

const InfoContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const RoomCardSkeleton = () => (
  <Container>
    <Skeleton width={300} height={200} style={{ marginRight: 12 }} />
    <InfoContainer>
      <TopContainer>
        <Skeleton width={200} height={16.8} />
        <Skeleton width={300} height={24} />
        <Skeleton width={250} height={16.8} style={{ marginTop: 22 }} />
        <Skeleton width={300} height={16.8} />
      </TopContainer>
      <BottomContainer>
        <Skeleton width={60} height={16.8} />
        <Skeleton width={110} height={32} />
      </BottomContainer>
    </InfoContainer>
  </Container>
);

export default RoomCardSkeleton;
