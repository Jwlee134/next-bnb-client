import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Button from "components/common/Button";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { commonActions } from "store/common";
import { useSelector } from "store";
import { useRouter } from "next/router";

interface MiniSearchBarProps {
  pathname: string;
  scroll: number;
  sizeUpAnimate: boolean;
  scaleDown: boolean;
}

const sizeDown = keyframes`
  0% {
    transform: translateY(85px) scale(2, 1);
    display: none;
  }
  100% {
    transform: translateY(0px) scale(1, 1);
  }
`;

const sizeUp = keyframes`
  0% {
    transform: translateY(0px) scale(1, 1);
  }
  100% {
    transform: translateY(85px) scale(2, 1);
    display: none;
  }
`;

const homeCss = (scroll: number) => {
  if (scroll) {
    // 홈 화면에서 스크롤이 움직이기 시작할 때 사이즈다운 애니메이션
    return css`
      animation: ${sizeDown} 0.1s linear forwards;
    `;
  }
  if (!scroll) {
    // 홈 화면에서 스크롤이 0이 되면 사이즈업 애니메이션
    return css`
      animation: ${sizeUp} 0.1s linear forwards;
    `;
  }
  return css``;
};

const Container = styled.div<MiniSearchBarProps>`
  width: 350px;
  height: 48px;
  border: 1px solid #dddddd;
  border-radius: 24px;
  transition: all 0.2s linear;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: white;
  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  }
  span {
    color: black;
    margin-left: 18px;
    font-size: 14px;
    font-weight: 500;
  }
  button {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ${({ pathname, scroll }) => pathname === "/" && homeCss(scroll)}
  ${({ sizeUpAnimate }) =>
    sizeUpAnimate &&
    css`
      animation: ${sizeUp} 0.1s linear forwards;
    `}
    ${({ scaleDown }) =>
    scaleDown &&
    css`
      animation: ${sizeDown} 0.1s linear forwards;
    `}
    ${({ pathname }) =>
    pathname === "/room/[id]" &&
    css`
      width: 300px;
    `}
`;

interface Props {
  scroll: number;
}

const MiniSearchBar = ({ scroll }: Props) => {
  const showMiniSearchBar = useSelector(
    (state) => state.common.showMiniSearchBar
  );
  const scaleDown = useSelector((state) => state.common.scaleDown);
  const [sizeUpAnimate, setSizeUpAnimate] = useState(false);
  const dispatch = useDispatch();

  const { pathname } = useRouter();

  const handleClick = () => {
    // 미니바 클릭 시 사이즈업 애니메이션 즉시 실행
    setSizeUpAnimate(true);
    // 애니메이션 종료되면(0.08초) 미니바 숨기고 큰 검색바 보여줌
    setTimeout(() => {
      dispatch(commonActions.setShowMiniSearchBar(false));
      dispatch(commonActions.setShowSearchBar(true));
      setSizeUpAnimate(false);
    }, 100);
  };

  useEffect(() => {
    if (pathname === "/") {
      // 홈 화면 스크롤 이벤트
      if (scroll && !showMiniSearchBar) {
        // 스크롤이 움직이기 시작하면 미니바 보여줌
        dispatch(commonActions.setShowMiniSearchBar(true));
      }
      // 스크롤이 0이 되면 0.08초 후 미니바 숨김
      if (!scroll && showMiniSearchBar) {
        setTimeout(() => {
          dispatch(commonActions.setShowMiniSearchBar(false));
        }, 100);
      }
    }
    if (pathname !== "/") {
      // 홈 화면 이외의 스크롤 이벤트
      if (scroll && !showMiniSearchBar) {
        // 미니바가 숨겨진 상태에서(큰 검색바가 있을 때) 스크롤이 움직이면
        // 미니바를 보여줌과 동시에 사이즈다운 애니메이션 즉시 실행
        dispatch(commonActions.setScaleDown(true));
        dispatch(commonActions.setShowMiniSearchBar(true));
        setTimeout(() => {
          dispatch(commonActions.setScaleDown(false));
        }, 100);
      }
    }
  }, [scroll]);

  // 홈 화면에서는 미니바가 기본적으로 숨겨짐
  if (!showMiniSearchBar) return null;
  return (
    <Container
      pathname={pathname}
      scroll={scroll}
      sizeUpAnimate={sizeUpAnimate}
      scaleDown={scaleDown}
      onClick={handleClick}
    >
      <span>검색 시작하기</span>
      <Button>
        <BiSearch size={18} />
      </Button>
    </Container>
  );
};

export default MiniSearchBar;
