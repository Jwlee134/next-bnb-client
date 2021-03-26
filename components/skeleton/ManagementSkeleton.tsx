import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Container = styled.tbody`
  td:first-child {
    div {
      span:first-child {
        span {
          width: 56px;
          height: 40px;
          border-radius: 5px;
          margin-right: 12px;
        }
      }
      span:last-child {
        width: 100%;
      }
    }
  }
`;

const ManagementSkeleton = () => (
  <Container>
    <tr>
      <td>
        <div>
          <Skeleton />
          <Skeleton />
        </div>
      </td>
      <td>
        <Skeleton />
      </td>
      <td>
        <Skeleton />
      </td>
      <td>
        <Skeleton />
      </td>
      <td>
        <Skeleton />
      </td>
      <td>
        <Skeleton />
      </td>
      <td>
        <Skeleton />
      </td>
    </tr>
  </Container>
);

export default ManagementSkeleton;
