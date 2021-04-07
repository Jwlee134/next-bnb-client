import Button from "components/common/Button";
import Counter from "components/common/Counter";
import Selector from "components/common/Selector";
import { bedTypeList } from "lib/staticData";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hostingActions } from "store/hosting";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 0px;
  border-top: 1px solid #dddddd;
  .bedroom_bed-type_counter-container {
    margin: 20px 0px;
  }
`;

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
    <Container>
      <div className="bedroom_bed-type_left-container">
        <div>{bedroom.id}번 침실</div>
        <div className="bedroom_bed-type_bed-text">
          침대 {totalBedCount()}개
        </div>
        {!add && <div className="bedroom_bed-type_bed-text">{beds}</div>}
        {add &&
          bedroom.beds.map((bed, index) => (
            <div className="bedroom_bed-type_counter-container" key={index}>
              <Counter
                onClick={(value) => handleClick(value, bed.label, bedroom.id)}
                label={bed.label}
                value={bed.count}
                disableValue={0}
              />
            </div>
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
      </div>
      <div className="bedroom_bed-type_right-container">
        <Button backgroundColor="white" onClick={() => setAdd(!add)}>
          {add ? "완료" : "침대 추가하기"}
        </Button>
      </div>
    </Container>
  );
};

export default React.memo(BedType);
