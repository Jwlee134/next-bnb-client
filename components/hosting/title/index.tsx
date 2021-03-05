import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div``;

const Title = () => {
  const { title } = useSelector((state) => state.hosting);
  const dispatch = useDispatch();

  return (
    <>
      <Container></Container>
      <Footer nextHref="/become-a-host/title" />
    </>
  );
};

export default Title;
