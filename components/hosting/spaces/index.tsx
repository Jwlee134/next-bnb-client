import Checkbox from "components/common/Checkbox";
import { spaceList } from "lib/staticData";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div``;

const Spaces = () => {
  const { spaces } = useSelector((state) => state.hosting);
  const dispatch = useDispatch();

  const handleChange = (items: string[]) => {
    dispatch(hostingActions.setSpaces(items));
  };

  return (
    <>
      <Container>
        <h1>게스트가 어떤 공간을 사용할 수 있나요?</h1>
        <h3>
          등록하고자 하는 숙소에서 게스트가 이용 가능한 공용 공간을 선택하세요.
        </h3>
        <Checkbox options={spaceList} items={spaces} onChange={handleChange} />
      </Container>
      <Footer nextHref="/become-a-host/photos" />
    </>
  );
};

export default Spaces;
