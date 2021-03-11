import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Button from "components/common/Button";
import { BiSearch } from "react-icons/bi";

interface MiniSearchBarProps {
  isHome: boolean;
  scroll: number;
  sizeUpAnimate: boolean;
  sizeDownAnimate: boolean;
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
      animation: ${sizeDown} 0.08s linear forwards;
    `;
  }
  if (!scroll) {
    // 홈 화면에서 스크롤이 0이 되면 사이즈업 애니메이션
    return css`
      animation: ${sizeUp} 0.08s linear forwards;
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
  ${({ isHome, scroll }) => isHome && homeCss(scroll)}
  ${({ sizeUpAnimate }) =>
    sizeUpAnimate &&
    css`
      animation: ${sizeUp} 0.08s linear forwards;
    `}
    ${({ sizeDownAnimate }) =>
    sizeDownAnimate &&
    css`
      animation: ${sizeDown} 0.08s linear forwards;
    `}
`;

interface Props {
  isHome: boolean;
  scroll: number;
  hideMiniBar: boolean;
  sizeDownAnimate: boolean;
  setHideMiniBar: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBar: React.Dispatch<React.SetStateAction<boolean>>;
  setSizeDownAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}

const MiniSearchBar = ({
  isHome,
  scroll,
  hideMiniBar,
  sizeDownAnimate,
  setHideMiniBar,
  setShowBar,
  setSizeDownAnimate,
}: Props) => {
  const [sizeUpAnimate, setSizeUpAnimate] = useState(false);

  const handleClick = () => {
    // 미니바 클릭 시 사이즈업 애니메이션 즉시 실행
    setSizeUpAnimate(true);
    // 애니메이션 종료되면(0.08초) 미니바 숨기고 큰 검색바 보여줌
    setTimeout(() => {
      setHideMiniBar(true);
      setShowBar(true);
      setSizeUpAnimate(false);
    }, 80);
  };

  useEffect(() => {
    if (isHome) {
      // 홈 화면 스크롤 이벤트
      if (scroll) {
        // 스크롤이 움직이면 미니바 보여줌
        setHideMiniBar(false);
      } else {
        // 스크롤이 0이 되면 0.08초 후 미니바 숨김
        setTimeout(() => {
          setHideMiniBar(true);
        }, 80);
      }
    }
    if (!isHome) {
      // 홈 화면 이외의 스크롤 이벤트
      if (scroll && hideMiniBar) {
        // 미니바가 숨겨진 상태에서(큰 검색바가 있을 때) 스크롤이 움직이면
        // 미니바를 보여줌과 동시에 사이즈다운 애니메이션 즉시 실행
        setSizeDownAnimate(true);
        setHideMiniBar(false);
        setTimeout(() => {
          setSizeDownAnimate(false);
        }, 80);
      }
    }
  }, [scroll]);

  // 홈 화면에서는 미니바가 기본적으로 숨겨짐
  if (hideMiniBar) return null;
  return (
    <Container
      isHome={isHome}
      scroll={scroll}
      sizeUpAnimate={sizeUpAnimate}
      sizeDownAnimate={sizeDownAnimate}
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
