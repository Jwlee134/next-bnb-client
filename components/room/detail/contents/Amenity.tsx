import React from "react";
import styled from "styled-components";
import Iron from "../../../public/static/svg/room/iron.svg";
import Shampoo from "../../../public/static/svg/room/shampoo.svg";
import HairDryer from "../../../public/static/svg/room/hair-dryer.svg";
import Closet from "../../../public/static/svg/room/closet.svg";
import Coffee from "../../../public/static/svg/room/coffee.svg";
import Door from "../../../public/static/svg/room/door.svg";
import FirePlace from "../../../public/static/svg/room/fireplace.svg";
import Ice from "../../../public/static/svg/room/ice.svg";
import Laptop from "../../../public/static/svg/room/laptop.svg";
import Thermometer from "../../../public/static/svg/room/thermometer.svg";
import TV from "../../../public/static/svg/room/tv.svg";
import Wifi from "../../../public/static/svg/room/wifi.svg";

const Container = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  span {
    font-size: 17px;
    font-weight: 300;
  }
  svg {
    margin-right: 10px;
  }
`;

const Amenity = ({ amenity }: { amenity: string }) => {
  const amenityIcon = () => {
    switch (amenity) {
      case "무선 인터넷":
        return <Wifi />;
      case "TV":
        return <TV />;
      case "난방":
        return <Thermometer />;
      case "에어컨":
        return <Ice />;
      case "다리미":
        return <Iron />;
      case "샴푸":
        return <Shampoo />;
      case "헤어 드라이어":
        return <HairDryer />;
      case "조식, 커피, 차":
        return <Coffee />;
      case "업무가능 공간/책상":
        return <Laptop />;
      case "벽난로":
        return <FirePlace />;
      case "옷장/서랍장":
        return <Closet />;
      case "게스트 전용 출입문":
        return <Door />;
      default:
        return <></>;
    }
  };

  return (
    <Container>
      <span>{amenityIcon()}</span>
      <span>{amenity}</span>
    </Container>
  );
};

export default Amenity;
