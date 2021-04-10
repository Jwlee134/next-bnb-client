import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Container = styled.tbody`
  .management_td {
    &:first-child {
      div {
        > span:first-child {
          width: 56px;
          min-width: 56px;
          height: 40px;
          border-radius: 5px;
          margin-right: 12px;
          span {
            height: 100%;
          }
        }
        > span:last-child {
          max-width: 500px;
          width: 500px;
        }
      }
    }
  }
`;

const ManagementSkeleton = () => (
  <Container>
    <tr className="management_tr">
      <td className="management_td">
        <div>
          <Skeleton />
          <Skeleton />
        </div>
      </td>
      <td className="management_td">
        <Skeleton />
      </td>
      <td className="management_td">
        <Skeleton />
      </td>
      <td className="management_td">
        <Skeleton />
      </td>
      <td className="management_td">
        <Skeleton />
      </td>
      <td className="management_td">
        <Skeleton />
      </td>
      <td className="management_td">
        <Skeleton />
      </td>
    </tr>
  </Container>
);

export default ManagementSkeleton;
