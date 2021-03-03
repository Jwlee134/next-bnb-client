import Button from "components/common/Button";
import Selector from "components/common/Selector";
import React, { useMemo, useState } from "react";
import { useSelector } from "store";
import styled from "styled-components";
import palette from "styles/palette";
import { bedTypeList } from "lib/staticData";
import { useDispatch } from "react-redux";
import { hostingActions } from "store/hosting";
import Counter from "components/common/Counter";

const BedTypeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 0px;
  margin-bottom: 24px;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
`;

const CounterContainer = styled.div`
  margin: 20px 0px;
`;

const LeftContainer = styled.div`
  width: 100%;
  margin-right: 50px;
`;

const Label = styled.div``;

const Bed = styled.div`
  opacity: 0.7;
  font-size: 15px;
`;

const RightContainer = styled.div``;

const PublicBedType = () => {
  const publicBedType = useSelector((state) => state.hosting.publicBedType);
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);

  const addedBedTypeList = publicBedType.map((bed) => bed.type);

  const excludedAddedBedType = bedTypeList.filter(
    (bed) => !addedBedTypeList.includes(bed)
  );

  const totalBedsCount = useMemo(() => {
    let total = 0;
    publicBedType.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [publicBedType]);

  const handleClick = (value: number, type: string) => {
    dispatch(hostingActions.setPublicBedTypeCount({ value, type }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(hostingActions.setPublicBedType(e.target.value));
  };

  const beds = publicBedType
    .map((bed) => `${bed.type} ${bed.count}개`)
    .join(", ");

  return (
    <BedTypeContainer>
      <LeftContainer>
        <Label>공용 공간</Label>
        <Bed>침대 {totalBedsCount}개</Bed>
        {!add && <Bed>{beds}</Bed>}
        {add &&
          publicBedType.map((bed, index) => (
            <CounterContainer key={index}>
              <Counter
                label={bed.type}
                value={bed.count}
                onClick={(value) => handleClick(value, bed.type)}
                disableValue={0}
              />
            </CounterContainer>
          ))}
        {add && (
          <Selector
            options={excludedAddedBedType}
            onChange={handleChange}
            initialValue="침대 추가하기"
            value="침대 추가하기"
            style={{ marginTop: 24 }}
          />
        )}
      </LeftContainer>
      <RightContainer>
        <Button
          onClick={() => setAdd(!add)}
          style={{
            width: 160,
            backgroundColor: "white",
            color: "black",
            border: `1px solid ${palette.dark_cyan} `,
          }}
        >
          {add ? "완료" : "침대 추가하기"}
        </Button>
      </RightContainer>
    </BedTypeContainer>
  );
};

export default PublicBedType;
