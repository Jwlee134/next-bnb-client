import Button from "components/common/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { IoIosArrowBack } from "react-icons/io";
import useValidation from "hooks/useValidation";

const Container = styled.div`
  width: 100%;
  height: 88px;
  border-top: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
`;

const GoBack = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;

const Footer = ({
  nextHref,
  isValid = true,
}: {
  nextHref: string;
  isValid: boolean;
}) => {
  const router = useRouter();
  const { setValidation } = useValidation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isValid) {
      setValidation(true);
      e.preventDefault();
    }
  };

  useEffect(() => {
    return () => {
      setValidation(false);
    };
  }, []);

  return (
    <Container>
      <GoBack onClick={() => router.back()}>
        <IoIosArrowBack size={20} />
        뒤로
      </GoBack>
      <Link href={nextHref}>
        <a>
          <Button
            onClick={handleClick}
            style={{ width: 62, backgroundColor: palette.dark_cyan }}
          >
            계속
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default Footer;
