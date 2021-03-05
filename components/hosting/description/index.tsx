import Textarea from "components/common/Textarea";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div``;

const Description = () => {
  const { description } = useSelector((state) => state.hosting);
  const dispatch = useDispatch();

  const handleChange = (value: string) => {
    dispatch(hostingActions.setDescription(value));
  };

  return (
    <>
      <Container>
        <h1>게스트에게 숙소에 대해 설명해주세요.</h1>
        <h3>
          숙소의 장점, 특별한 편의시설(예: 빠른 와이파이 또는 주차 시설)과 주변
          지역의 매력을 소개해주세요.
        </h3>
        <Textarea
          isValid={!!description && description.length < 501}
          onChange={handleChange}
          content={description || ""}
          maxLength={1500}
        />
      </Container>
      <Footer
        isValid={!!description && description.length < 501}
        nextHref="/become-a-host/title"
      />
    </>
  );
};

export default Description;
