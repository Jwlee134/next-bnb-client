import React from "react";
import styled from "styled-components";

const OnePhoto = styled.div`
  max-width: 950px;
  margin: 0 auto;
  border-radius: 14px;
  overflow: hidden;
  div {
    position: relative;
    padding-top: 56.25%;
    height: 0;
  }
`;

const TwoPhotos = styled.div`
  display: flex;
  border-radius: 14px;
  overflow: hidden;
  > div {
    width: 50%;
    &:first-child {
      > div {
        margin-right: 8px;
      }
    }
    > div {
      position: relative;
      padding-top: 56.25%;
      height: 0;
    }
  }
`;

const ManyPhotos = styled.div`
  display: flex;
  border-radius: 14px;
  overflow: hidden;
  .first-photo {
    width: 50%;
    margin-right: 8px;
    > div {
      padding-top: 75%;
      position: relative;
    }
  }
  .rest-photos {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    .rest-photo {
      width: calc(50% - 4px);
      > div {
        padding-top: calc(75% - 1.5px);
        position: relative;
        height: 0;
      }
      &:first-child {
        margin-right: 8px;
        margin-bottom: 8px;
      }
      &:nth-child(3) {
        margin-right: 8px;
      }
    }
  }
`;

const Photos = ({ photos }: { photos: string[] }) => {
  if (photos.length === 1) {
    return (
      <OnePhoto>
        <div>
          <img src={photos[0]} alt="" />
        </div>
      </OnePhoto>
    );
  }
  if (photos.length === 2) {
    return (
      <TwoPhotos>
        <div>
          <div>
            <img src={photos[0]} alt="" />
          </div>
        </div>
        <div>
          <div>
            <img src={photos[1]} alt="" />
          </div>
        </div>
      </TwoPhotos>
    );
  }
  return (
    <ManyPhotos>
      <div className="first-photo">
        <div>
          <img src={photos[0]} alt="" />
        </div>
      </div>
      <div className="rest-photos">
        <div className="rest-photo">
          <div>
            <img src={photos[1]} alt="" />
          </div>
        </div>
        <div className="rest-photo">
          <div>
            <img src={photos[2]} alt="" />
          </div>
        </div>
        {photos[3] && (
          <div className="rest-photo">
            <div>
              <img src={photos[3]} alt="" />
            </div>
          </div>
        )}
        {photos[4] && (
          <div className="rest-photo">
            <div>
              <img src={photos[4]} alt="" />
            </div>
          </div>
        )}
      </div>
    </ManyPhotos>
  );
};

export default Photos;
