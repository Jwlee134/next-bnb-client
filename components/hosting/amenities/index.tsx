import Checkbox from "components/common/Checkbox";
import { amenityList } from "lib/staticData";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div``;

const Amenities = () => {
  const { amenities } = useSelector((state) => state.hosting);
  const dispatch = useDispatch();

  const handleChange = (items: string[]) => {
    dispatch(hostingActions.setAmenities(items));
  };

  return (
    <>
      <Container>
        <h1>어떤 편의시설을 제공하시나요?</h1>
        <h3>
          일반적으로 게스트가 기대하는 편의시설 목록입니다. 숙소를 등록한 후
          언제든 편의시설을 추가할 수 있어요.
        </h3>
        <Checkbox
          options={amenityList}
          items={amenities}
          onChange={handleChange}
        />
      </Container>
      <Footer nextHref="/become-a-host/spaces" />
    </>
  );
};

export default Amenities;
