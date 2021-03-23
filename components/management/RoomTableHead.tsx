import React from "react";
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";

const RoomTableHead = () => {
  const handleClick = () => {};
  return (
    <thead>
      <tr>
        <th onClick={handleClick}>
          <div>
            숙소
            <TiArrowUnsorted />
          </div>
        </th>
        <th onClick={handleClick}>
          <div>
            침실
            <TiArrowUnsorted />
          </div>
        </th>
        <th onClick={handleClick}>
          <div>
            침대
            <TiArrowUnsorted />
          </div>
        </th>
        <th onClick={handleClick}>
          <div>
            욕실
            <TiArrowUnsorted />
          </div>
        </th>
        <th onClick={handleClick}>
          <div>위치</div>
        </th>
        <th onClick={handleClick}>
          <div>
            최종 수정일
            <TiArrowUnsorted />
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default RoomTableHead;
