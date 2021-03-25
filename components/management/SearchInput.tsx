import Input from "components/common/Input";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import useDebounce from "hooks/useDebounce";
import { useRouter } from "next/router";
import { IRoomDetail } from "types/room";
import { makeQueryString } from "utils";

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

const SearchInput = ({ data }: { data: IRoomDetail[] | undefined }) => {
  const router = useRouter();
  const { query } = router;
  const [text, setText] = useState("");

  const keyword = useDebounce(text, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  useEffect(() => {
    if (!data) return;
    router.push(`/management${makeQueryString({ ...query, term: keyword })}`);
  }, [keyword]);

  useEffect(() => {
    if (query.term) setText(query.term as string);
  }, []);

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
