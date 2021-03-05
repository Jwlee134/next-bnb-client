import Textarea from "components/common/Textarea";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div`
  textarea {
    min-height: 0;
    height: 48px;
  }
`;

const Title = () => {
  const { title } = useSelector((state) => state.hosting);
  const dispatch = useDispatch();

  const handleChange = (value: string) => {
    dispatch(hostingActions.setTitle(value));
  };

  return (
    <>
      <Container>
        <h1>숙소의 제목을 만드세요.</h1>
        <h3>
          숙소의 특징과 장점을 강조하는 제목으로 게스트의 관심을 끌어보세요.
        </h3>
        <Textarea
          isValid={!!title}
          maxLength={50}
          onChange={handleChange}
          content={title || ""}
        />
      </Container>
      <Footer isValid={!!title} nextHref="/become-a-host/title" />
    </>
  );
};

export default Title;
