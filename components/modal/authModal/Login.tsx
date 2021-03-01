import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "components/common/Input";
import Button from "components/common/Button";
import useValidation from "hooks/useValidation";
import { loginAPI } from "lib/api/auth";
import palette from "styles/palette";
import { useDispatch } from "react-redux";
import { userActions } from "store/user";

const Container = styled.form``;

const InputContainer = styled.div`
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 24px;
`;

const ErrorMessage = styled.div`
  margin-top: 8px;
  color: ${palette.tawny};
  font-weight: 300;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = ({ closeModal }: { closeModal: () => void }) => {
  const { setValidation } = useValidation();

  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidation(true);
    if (!email || !password) return;
    try {
      const { data } = await loginAPI({ email, password });
      dispatch(userActions.setUser(data));
      closeModal();
    } catch (error) {
      setErrorMessage(error.response.data);
    }
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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </ButtonContainer>
    </Container>
  );
};

export default Login;
