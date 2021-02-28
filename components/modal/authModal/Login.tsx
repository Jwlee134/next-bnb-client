import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "components/common/Input";
import Button from "components/common/Button";
import useValidation from "hooks/useValidation";

const Container = styled.form``;

const InputContainer = styled.div`
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 24px;
`;

const Login = () => {
  const { setValidation } = useValidation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidation(true);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    return () => {
      setValidation(false);
    };
  }, []);

  return (
    <Container onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleEmail}
          isValid={!!email}
        />
      </InputContainer>
      <InputContainer>
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePassword}
          isValid={!!password}
        />
      </InputContainer>
      <ButtonContainer>
        <Button type="submit">로그인</Button>
      </ButtonContainer>
    </Container>
  );
};

export default Login;
