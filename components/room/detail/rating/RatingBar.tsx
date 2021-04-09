import React from "react";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div<{ value: string }>`
  width: 100%;
  display: flex;
  .detail_rating_options_label {
    width: 65%;
    font-weight: 300;
  }
  .detail_rating_options_value {
    width: 35%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .detail_rating_options_value-bar {
      width: 85%;
      height: 5px;
      background-color: ${palette.gray_eb};
      border-radius: 5px;
      margin-right: 10px;
      position: relative;
      span {
        position: absolute;
        left: 0;
        z-index: 1;
        background-color: ${palette.black};
        height: 5px;
        border-radius: 5px;
        width: ${({ value }) => value};
      }
    }
    span {
      width: 15%;
      font-size: 12px;
      font-weight: 700;
    }
  }
  @media ${({ theme }) => theme.device.tabletSmall} {
    .detail_rating_options_value {
      width: 50%;
      .detail_rating_options_value-bar {
        width: 78%;
      }
      > span {
        width: 22%;
      }
    }
  }
`;

const RatingBar = ({
  item,
}: {
  item: {
    label: string;
    value: number;
  };
}) => {
  const formatLabel = (label: string) => {
    switch (label) {
      case "cleanliness":
        return "청결도";
      case "accuracy":
        return "정확성";
      case "communication":
        return "의사소통";
      case "location":
        return "위치";
      case "checkIn":
        return "체크인";
      case "satisfaction":
        return "가격 대비 만족도";
      default:
        return "";
    }
  };

  return (
    <Container value={`${(item.value / 5) * 100}%`}>
      <div className="detail_rating_options_label">
        {formatLabel(item.label)}
      </div>
      <div className="detail_rating_options_value">
        <div className="detail_rating_options_value-bar">
          <span />
        </div>
        <span>{item.value}</span>
      </div>
    </Container>
  );
};

export default RatingBar;
