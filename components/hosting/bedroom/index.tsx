import React from "react";
import styled from "styled-components";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import Counter from "components/common/Counter";
import { hostingActions } from "store/hosting";
import Selector from "components/common/Selector";
import { bedroomCountList } from "lib/staticData";
import Footer from "../Footer";
import PublicBedType from "./PublicBedType";
import BedTypeList from "./BedTypeList";

const Container = styled.div`
  .bedroom_count-container {
    margin-bottom: 32px;
    &:nth-child(even) {
      > div {
        width: 320px;
        @media ${({ theme }) => theme.device.mobile} {
          max-width: 320px;
          width: auto;
        }
      }
    }
  }
  .bedroom_bed-type-label {
    font-size: 24px;
    margin-bottom: 8px;
  }
  .bedroom_bed-type_bed-text {
    opacity: 0.7;
    font-size: 15px;
  }
  .bedroom_bed-type_left-container {
    width: 100%;
    margin-right: 50px;
  }
  .bedroom_bed-type_right-container {
    button {
      width: 160px;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    .bedroom_bed-type_left-container {
      margin-right: 16px;
    }
    .bedroom_bed-type-label {
      font-size: 20px;
    }
    .bedroom_bed-type_right-container {
      button {
        width: fit-content;
        white-space: nowrap;
        padding: 0px 16px;
      }
    }
  }
`;

const Bedroom = () => {
  const maximumGuestCount = useSelector(
    (state) => state.hosting.maximumGuestCount
  );
  const bedroomCount = useSelector((state) => state.hosting.bedroomCount);
  const bedCount = useSelector((state) => state.hosting.bedCount);
  const dispatch = useDispatch();

  const handleGuestCount = (value: number) => {
    dispatch(hostingActions.setMaximumGuestCount(value));
  };

  const handleBedroomCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      hostingActions.setBedroomCount(
        Number(e.target.value.replace(/[^0-9]/g, ""))
      )
    );
  };

  const handleBedCount = (value: number) => {
    dispatch(hostingActions.setBedCount(value));
  };

  return (
    <>
      <Container>
        <h1>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h1>
        <h3>
          모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지
          확인하세요.
        </h3>
        <div className="bedroom_count-container">
          <Counter
            label="최대 숙박 인원"
            value={maximumGuestCount}
            onClick={handleGuestCount}
          />
        </div>
        <div className="bedroom_count-container">
          <Selector
            options={bedroomCountList}
            label="게스트가 사용할 수 있는 침실은 몇 개인가요?"
            value={`침실 ${bedroomCount}개`}
            onChange={handleBedroomCount}
          />
        </div>
        <div className="bedroom_count-container">
          <Counter
            description="게스트가 사용할 수 있는 침대는 몇개인가요?"
            label="침대"
            value={bedCount}
            onClick={handleBedCount}
          />
        </div>
        <div className="bedroom_bed-type-label">침대 유형</div>
        <h3>
          각 침실에 놓인 침대 유형을 명시하면 숙소에 침대가 어떻게 구비되어
          있는지 게스트가 잘 파악할 수 있습니다.
        </h3>
        <BedTypeList />
        <PublicBedType />
      </Container>
      <Footer nextHref="/become-a-host/bathroom" />
    </>
  );
};

export default Bedroom;
