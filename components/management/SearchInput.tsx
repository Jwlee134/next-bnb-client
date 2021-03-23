import Input from "components/common/Input";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import useDebounce from "hooks/useDebounce";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 16px;
  .filter_input-container {
    width: 300px;
    height: 100%;
    position: relative;
    label {
      > div {
        width: 100%;
        height: 100%;
        input {
          max-height: 30px;
          border-radius: 30px;
          font-size: 14px;
          padding: 0px 11px 0px 35px;
          cursor: text;
        }
      }
      svg {
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

const SearchInput = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  const keyword = useDebounce(text, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  useEffect(() => {}, [keyword]);

  return (
    <Container>
      <div className="filter_input-container">
        <label>
          <IoSearchOutline size={18} />
          <Input value={text} onChange={handleChange} placeholder="숙소 검색" />
        </label>
      </div>
    </Container>
  );
};

export default SearchInput;
