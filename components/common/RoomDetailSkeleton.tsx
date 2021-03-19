import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

const Container = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  > span:last-child {
    margin-top: 12px;
    margin-bottom: 24px;
  }
`;

const PhotoContainer = styled.div`
  width: 100%;
  display: flex;
`;

const FirstPhoto = styled.div`
  width: 50%;
  height: 400px;
  span {
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`;

const RestPhotos = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  padding-left: 8px;
`;

const Block = styled.div`
  width: calc(50% - 4px);
  height: calc(50% - 4px);
  overflow: hidden;
  &:first-child {
    margin-bottom: 8px;
    margin-right: 8px;
  }
  &:nth-child(3) {
    margin-right: 8px;
  }
  span {
    border-radius: 0;
  }
  &:nth-child(2) {
    border-top-right-radius: 14px;
  }
  &:last-child {
    border-bottom-right-radius: 14px;
  }
`;

const BottomContainer = styled.div`
  margin-top: 48px;
  display: flex;
`;

const LeftContainer = styled.div`
  width: 64%;
  display: flex;
  justify-content: space-between;
`;

const RightContainer = styled.div`
  width: 36%;
  margin-left: 90px;
  span:first-child {
    margin-bottom: 16px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  > span:first-child {
    margin-bottom: 8px;
  }
`;

const AvatarContainer = styled.div`
  span {
    border-radius: 50%;
  }
`;

const RoomDetailSkeleton = () => (
  <Container>
    <TitleContainer>
      <Skeleton width={480} height={30} />
      <Skeleton width={320} height={20} />
    </TitleContainer>
    <PhotoContainer>
      <FirstPhoto>
        <Skeleton width="100%" height="100%" />
      </FirstPhoto>
      <RestPhotos>
        <Block>
          <Skeleton width="100%" height="100%" />
        </Block>
        <Block>
          <Skeleton width="100%" height="100%" />
        </Block>
        <Block>
          <Skeleton width="100%" height="100%" />
        </Block>
        <Block>
          <Skeleton width="100%" height="100%" />
        </Block>
      </RestPhotos>
    </PhotoContainer>
    <BottomContainer>
      <LeftContainer>
        <TextContainer>
          <Skeleton width={360} height={24} />
          <Skeleton width={120} height={16} />
        </TextContainer>
        <AvatarContainer>
          <Skeleton width={56} height={56} />
        </AvatarContainer>
      </LeftContainer>
      <RightContainer>
        <Skeleton width={128} height={32} />
        <Skeleton width="100%" height={48} />
      </RightContainer>
    </BottomContainer>
  </Container>
);

export default RoomDetailSkeleton;
