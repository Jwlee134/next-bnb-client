import React from "react";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import palette from "styles/palette";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import SignUp from "./SignUp";
import Login from "./Login";

const Container = styled.div`
  width: 568px;
`;

const AuthHeader = styled.header`
  width: 100%;
  position: relative;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${palette.gray_eb};
  padding: 0px 24px;
  svg {
    position: absolute;
    right: 24px;
    cursor: pointer;
  }
`;

const Description = styled.span`
  font-weight: 300;
`;

const ChangeAuthMode = styled.span`
  font-weight: 500;
  margin-left: 6px;
  text-decoration: underline;
  cursor: pointer;
`;

const AuthContainer = styled.div`
  padding: 24px;
`;

const AuthModal = ({ closeModal }: { closeModal: () => void }) => {
  const authMode = useSelector((state) => state.common.authMode);
  const dispatch = useDispatch();
  return (
    <Container>
      <AuthHeader>
        <span>{authMode === "login" ? "로그인" : "회원가입"}</span>
        <IoCloseSharp size={24} onClick={closeModal} />
      </AuthHeader>
      {authMode === "login" && (
        <AuthContainer>
          <Login />
          <Description>
            에어비앤비 계정이 없으세요?{" "}
            <ChangeAuthMode
              onClick={() => dispatch(commonActions.setAuthMode("signUp"))}
            >
              회원가입
            </ChangeAuthMode>
          </Description>
        </AuthContainer>
      )}
      {authMode === "signUp" && (
        <AuthContainer>
          <SignUp />
          <Description>
            이미 계정을 보유하고 계시나요?{" "}
            <ChangeAuthMode
              onClick={() => dispatch(commonActions.setAuthMode("login"))}
            >
              로그인
            </ChangeAuthMode>
          </Description>
        </AuthContainer>
      )}
    </Container>
  );
};

export default AuthModal;
