import Button from "components/common/Button";
import Counter from "components/common/Counter";
import Selector from "components/common/Selector";
import { bedTypeList } from "lib/staticData";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import palette from "styles/palette";

const BedTypeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 0px;
  border-top: 1px solid #dddddd;
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

interface Props {
  bedroom: {
    id: number;
    beds: { label: string; count: number }[];
  };
}

const BedType = ({ bedroom }: Props) => {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);

  const addedBedTypeList = bedroom.beds.map((bed) => bed.label);

  const excludeAddedBedType = bedTypeList.filter(
    (bed) => !addedBedTypeList.includes(bed)
  );

  const totalBedCount = () => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  };

  const handleClick = (value: number, label: string, id: number) => {
    dispatch(hostingActions.setBedTypeCount({ value, label, id }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    const label = e.target.value;
    dispatch(hostingActions.setBedType({ label, id }));
  };

  const beds = bedroom.beds
    .map((bed) => `${bed.label} ${bed.count}개`)
    .join(", ");

  return (
    <BedTypeContainer>
      <LeftContainer>
        <Label>{bedroom.id}번 침실</Label>
        <Bed>침대 {totalBedCount()}개</Bed>
        {!add && <Bed>{beds}</Bed>}
        {add &&
          bedroom.beds.map((bed, index) => (
            <CounterContainer key={index}>
              <Counter
                onClick={(value) => handleClick(value, bed.label, bedroom.id)}
                label={bed.label}
                value={bed.count}
                disableValue={0}
              />
            </CounterContainer>
          ))}
        {add && (
          <Selector
            options={excludeAddedBedType}
            initialValue="침대 추가하기"
            value="침대 추가하기"
            style={{ marginTop: 24 }}
            onChange={(e) => handleChange(e, bedroom.id)}
          />
        )}
      </LeftContainer>
      <RightContainer>
        <Button
          backgroundColor="white"
          onClick={() => setAdd(!add)}
          style={{
            width: 160,
          }}
        >
          {add ? "완료" : "침대 추가하기"}
        </Button>
      </RightContainer>
    </BedTypeContainer>
  );
};

export default React.memo(BedType);
