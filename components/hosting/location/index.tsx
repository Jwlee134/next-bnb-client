import Input from "components/common/Input";
import Selector from "components/common/Selector";
import { countryList } from "lib/staticData";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div`
  .location_flex-container {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    @media ${({ theme }) => theme.device.tabletSmall} {
      > div:first-child {
        margin-right: 24px;
      }
    }
  }
  .location_input-container {
    margin-bottom: 24px;
  }
  .location_input-container_title {
    margin-bottom: 8px;
  }
`;

const Location = () => {
  const {
    country,
    province,
    city,
    streetAddress,
    detailAddress,
    postalCode,
  } = useSelector((state) => state.hosting);
  const dispatch = useDispatch();

  const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(hostingActions.setCountry(e.target.value));
  };
  const handleProvince = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(hostingActions.setProvince(e.target.value));
  };
  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(hostingActions.setCity(e.target.value));
  };
  const handleStreetAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(hostingActions.setStreetAddress(e.target.value));
  };
  const handleDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(hostingActions.setDetailAddress(e.target.value));
  };
  const handlePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(hostingActions.setPostalCode(e.target.value));
  };

  return (
    <>
      <Container>
        <h1>숙소의 위치를 알려주세요.</h1>
        <h3>정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.</h3>
        <Selector
          label="국가/지역"
          options={countryList}
          initialValue="국가 선택하기"
          value={country || "국가 선택하기"}
          onChange={handleCountry}
          isValid={!!country}
        />
        <div className="location_flex-container">
          <div className="location_input-container">
            <div className="location_input-container_title">시/도</div>
            <Input
              isValid={!!province}
              showErrorMessage={false}
              onChange={handleProvince}
              value={province || ""}
            />
          </div>
          <div className="location_input-container">
            <div className="location_input-container_title">시/군/구</div>
            <Input
              isValid={!!city}
              showErrorMessage={false}
              onChange={handleCity}
              value={city || ""}
            />
          </div>
        </div>
        <div className="location_input-container">
          <div className="location_input-container_title">도로명</div>
          <Input
            isValid={!!streetAddress}
            showErrorMessage={false}
            onChange={handleStreetAddress}
            value={streetAddress || ""}
          />
        </div>
        <div className="location_input-container">
          <div className="location_input-container_title">동호수(선택사항)</div>
          <Input onChange={handleDetailAddress} value={detailAddress || ""} />
        </div>
        <div className="location_input-container">
          <div className="location_input-container_title">우편번호</div>
          <Input
            isValid={!!postalCode}
            style={{ width: "50%" }}
            showErrorMessage={false}
            onChange={handlePostalCode}
            value={postalCode || ""}
          />
        </div>
      </Container>
      <Footer
        isValid={
          !!country && !!province && !!city && !!streetAddress && !!postalCode
        }
        isLocation
        nextHref="/become-a-host/pin"
      />
    </>
  );
};

export default Location;
