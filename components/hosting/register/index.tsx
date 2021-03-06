import { isEmpty } from "lodash";
import React from "react";
import { useSelector } from "store";
import styled from "styled-components";
import Checklist from "../Checklist";
import Footer from "../Footer";

const Container = styled.div``;

const Register = () => {
  const {
    largeBuildingType,
    buildingType,
    roomType,
    country,
    province,
    city,
    streetAddress,
    postalCode,
    photos,
    description,
    title,
    price,
  } = useSelector((state) => state.hosting);

  return (
    <>
      <Container>
        <h1>숙소 등록 준비가 완료되었습니다!</h1>
        <Checklist
          label="숙소 및 게스트"
          isDone={
            !!largeBuildingType.label && !!buildingType.label && !!roomType
          }
          link="/become-a-host/building"
        />
        <Checklist
          label="위치"
          isDone={
            !!country && !!province && !!city && !!streetAddress && !!postalCode
          }
          link="/become-a-host/location"
        />
        <Checklist label="편의시설" link="/become-a-host/amenities" />
        <Checklist
          label="사진"
          isDone={!isEmpty(photos)}
          link="/become-a-host/photos"
        />
        <Checklist
          label="설명 및 제목"
          isDone={!!description && !!title}
          link="/become-a-host/description"
        />
        <Checklist label="이용 규칙" link="/become-a-host/rules" />
        <Checklist
          label="달력 및 예약 가능 여부"
          link="/become-a-host/availability"
        />
        <Checklist
          label="요금"
          isDone={price !== 0}
          link="/become-a-host/price"
        />
      </Container>
      <Footer
        isValid={
          !!largeBuildingType.label &&
          !!buildingType.label &&
          !!roomType &&
          !!country &&
          !!province &&
          !!city &&
          !!streetAddress &&
          !!postalCode &&
          !isEmpty(photos) &&
          !!description &&
          !!title &&
          price !== 0
        }
        isSubmit={true}
      />
    </>
  );
};

export default Register;
