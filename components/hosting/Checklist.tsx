import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import { AiOutlineCheck } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";

const Container = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;

const Label = styled.div<{ isDone: boolean }>`
  cursor: pointer;
  color: ${palette.gray_76};
  ${({ isDone }) =>
    isDone &&
    css`
      color: black;
      text-decoration: underline;
    `};
`;

interface Props {
  label: string;
  isDone?: boolean;
  link: string;
}

const Checklist = ({ label, isDone = true, link }: Props) => {
  return (
    <Container>
      {isDone ? <AiOutlineCheck size={20} /> : <FcCancel size={20} />}
      <Link href={link}>
        <a>
          <Label isDone={isDone}>{label}</Label>
        </a>
      </Link>
    </Container>
  );
};

export default Checklist;
