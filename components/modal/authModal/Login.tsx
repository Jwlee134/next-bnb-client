import React from "react";
import styled from "styled-components";
import Input from "components/common/Input";

const Container = styled.div``;

const InputContainer = styled.div`
  margin-bottom: 24px;
`;

const Login = () => {
  return (
    <Container>
      <InputContainer>
        <Input type="email" placeholder="이메일" />
      </InputContainer>
      <InputContainer>
        <Input type="password" placeholder="비밀번호" />
      </InputContainer>
    </Container>
  );
};

export default Login;
