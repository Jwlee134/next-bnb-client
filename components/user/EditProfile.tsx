import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: fit-content;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
  font-size: 15px;
  text-decoration: underline;
`;

const EditProfile = () => {
  return <Container>프로필 수정하기</Container>;
};

export default EditProfile;
