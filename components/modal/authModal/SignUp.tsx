import React from "react";
import Input from "components/common/Input";
import styled from "styled-components";

const Container = styled.div``;

const InputContainer = styled.div`
  margin-bottom: 24px;
`;

const SignUp = () => {
  return (
    <Container>
      <InputContainer>
        <Input type="text" placeholder="이름" />
      </InputContainer>
      <InputContainer>
        <Input type="text" placeholder="성" />
      </InputContainer>
      <InputContainer>
        <Input type="email" placeholder="이메일" />
      </InputContainer>
      <InputContainer>
        <Input type="password" placeholder="비밀번호" />
      </InputContainer>
    </Container>
  );
};

export default SignUp;
