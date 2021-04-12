import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { RiKakaoTalkFill } from "react-icons/ri";
import Button from "components/common/Button";
import SignUp from "./SignUp";
import Login from "./Login";
import ModalHeader from "../ModalHeader";

const Container = styled.div`
  width: 568px;
  display: flex;
  flex-direction: column;
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

const ButtonContainer = styled.div`
  margin-bottom: 16px;
`;

const AuthContainer = styled.div`
  padding: 24px;
  overflow-y: auto;
  max-height: 568px;
  @media ${({ theme }) => theme.device.tabletSmall} {
    max-height: 75vh;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.gray_c4};
  margin-bottom: 24px;
  position: relative;
  span {
    position: absolute;
    font-size: 14px;
    font-weight: 300;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 0px 10px;
  }
`;

const AuthModal = ({ closeModal }: { closeModal: () => void }) => {
  const authMode = useSelector((state) => state.common.authMode);
  const dispatch = useDispatch();

  const isLogin = authMode === "login";

  const handleGoogleLogin = () => {
    const link = document.createElement("a");
    link.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    }&redirect_uri=${
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BASE_URL
        : process.env.NEXT_PUBLIC_BASE_URL_PROD
    }/oauth/google&response_type=code&scope=email profile`;
    link.click();
  };

  const handleGithubLogin = () => {
    const link = document.createElement("a");
    link.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user`;
    link.click();
  };

  const handleKakaoLogin = () => {
    const link = document.createElement("a");
    link.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
      process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
    }&redirect_uri=${
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BASE_URL
        : process.env.NEXT_PUBLIC_BASE_URL_PROD
    }/oauth/kakao&response_type=code`;
    link.click();
  };

  return (
    <Container>
      <ModalHeader onClick={closeModal}>
        <span>{authMode === "login" ? "로그인" : "회원가입"}</span>
      </ModalHeader>
      <AuthContainer>
        {isLogin ? (
          <Login closeModal={closeModal} />
        ) : (
          <SignUp closeModal={closeModal} />
        )}
        <Divider>
          <span>또는</span>
        </Divider>
        <ButtonContainer>
          <Button socialAuthButton={true} onClick={handleGoogleLogin}>
            <FcGoogle size={24} />
            Google 계정으로 계속하기
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button socialAuthButton={true} onClick={handleGithubLogin}>
            <GrGithub size={24} />
            Github 계정으로 계속하기
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button socialAuthButton={true} onClick={handleKakaoLogin}>
            <RiKakaoTalkFill size={24} />
            Kakao 계정으로 계속하기
          </Button>
        </ButtonContainer>
        <Description>
          {isLogin
            ? "에어비앤비 계정이 없으세요?"
            : "이미 계정을 보유하고 계시나요?"}
          <ChangeAuthMode
            onClick={() => {
              dispatch(commonActions.setAuthMode(isLogin ? "signUp" : "login"));
            }}
          >
            {isLogin ? "회원가입" : "로그인"}
          </ChangeAuthMode>
        </Description>
      </AuthContainer>
    </Container>
  );
};

export default AuthModal;
