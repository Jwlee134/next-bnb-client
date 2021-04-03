import Button from "components/common/Button";
import Checkbox from "components/common/Checkbox";
import Input from "components/common/Input";
import { rulesList } from "lib/staticData";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import palette from "styles/palette";
import Footer from "../Footer";

const Container = styled.div``;

const InputContainer = styled.form`
  display: flex;
  position: relative;
  button {
    width: 62px;
    background-color: white;
    border: 1px solid ${palette.gray_dd};
    color: black;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &:active {
      border-color: ${palette.dark_cyan};
    }
  }
  input {
    padding-right: 73px;
    margin-bottom: 24px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const Text = styled.div`
  margin-bottom: 15px;
  max-width: 450px;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  svg {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const Rules = () => {
  const { forbiddenRules, customRules } = useSelector((state) => state.hosting);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text) {
      dispatch(hostingActions.setCustomRules([...customRules, text]));
      setText("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAdd();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDelete = (value: number) => {
    const filtered = customRules.filter((_, index) => index !== value);
    dispatch(hostingActions.setCustomRules(filtered));
  };

  const handleCheckbox = (list: string[]) => {
    dispatch(hostingActions.setForbiddenRules(list));
  };

  return (
    <>
      <Container>
        <h1>게스트가 지켜야 할 숙소 이용규칙을 정하세요.</h1>
        <h3>게스트는 예약하기 전에 숙소 이용규칙에 동의해야 합니다.</h3>
        <Checkbox
          options={rulesList}
          items={forbiddenRules}
          onChange={handleCheckbox}
        />
        <Text>추가 규칙</Text>
        {customRules.map((rule, index) => (
          <TextContainer key={index}>
            <Text>{rule}</Text>
            <IoCloseSharp onClick={() => handleDelete(index)} size={22} />
          </TextContainer>
        ))}
        <InputContainer onSubmit={handleSubmit}>
          <Input
            value={text}
            onChange={handleChange}
            placeholder="조용히 해야 하는 시간, 실내 신발 착용 여부 등"
          />
          <Button backgroundColor="white" onClick={handleAdd}>
            추가
          </Button>
        </InputContainer>
      </Container>
      <Footer nextHref="/become-a-host/availability" />
    </>
  );
};

export default Rules;
