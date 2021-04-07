import Button from "components/common/Button";
import Selector from "components/common/Selector";
import React, { useMemo, useState } from "react";
import { useSelector } from "store";
import styled from "styled-components";
import { bedTypeList } from "lib/staticData";
import { useDispatch } from "react-redux";
import { hostingActions } from "store/hosting";
import Counter from "components/common/Counter";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 0px;
  margin-bottom: 24px;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
`;

const PublicBedType = () => {
  const publicBedType = useSelector((state) => state.hosting.publicBedType);
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);

  const addedBedTypeList = publicBedType.map((bed) => bed.label);

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

  const handleClick = (value: number, label: string) => {
    dispatch(hostingActions.setPublicBedTypeCount({ value, label }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(hostingActions.setPublicBedType(e.target.value));
  };

  const beds = publicBedType
    .map((bed) => `${bed.label} ${bed.count}개`)
    .join(", ");

  return (
    <Container>
      <div className="bedroom_bed-type_left-container ">
        <div>공용 공간</div>
        <div className="bedroom_bed-type_bed-text">침대 {totalBedsCount}개</div>
        {!add && <div className="bedroom_bed-type_bed-text">{beds}</div>}
        {add &&
          publicBedType.map((bed, index) => (
            <div
              className="bedroom_public-bed-type_counter-container"
              key={index}
            >
              <Counter
                label={bed.label}
                value={bed.count}
                onClick={(value) => handleClick(value, bed.label)}
                disableValue={0}
              />
            </div>
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
      </div>
      <div className="bedroom_bed-type_right-container">
        <Button backgroundColor="white" onClick={() => setAdd(!add)}>
          {add ? "완료" : "침대 추가하기"}
        </Button>
      </div>
    </Container>
  );
};

export default React.memo(PublicBedType);
