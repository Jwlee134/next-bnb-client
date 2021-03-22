import { isEmpty } from "lodash";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { IWishlist } from "types/user";

const Container = styled.div`
  width: calc(33.3% - 21.33px);
  cursor: pointer;
  height: 300px;
  margin-right: 32px;
  transition: box-shadow 0.1s linear;
  margin-bottom: 32px;
  box-shadow: 0px 6px 16px rgb(0 0 0 / 12%);
  border-radius: 12px;
  overflow: hidden;
  &:nth-child(3n) {
    margin-right: 0;
  }
  &:hover {
    box-shadow: 0px 6px 20px rgb(0 0 0 / 20%);
  }
  .list-card_thumbnail {
    height: 65%;
    background-color: ${palette.gray_eb};
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .list-card_contents {
    padding: 24px;
    height: 35%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    div:first-child {
      font-size: 22px;
      font-weight: 500;
    }
    div:last-child {
      font-size: 15px;
      font-weight: 300;
    }
  }
`;

const ListCard = ({ item }: { item: IWishlist }) => {
  return (
    <Container>
      <Link href={`/wishlists/${item._id}`}>
        <a>
          <div className="list-card_thumbnail">
            {!isEmpty(item.list) && <img src={item.list[0].photos[0]} alt="" />}
          </div>
          <div className="list-card_contents">
            <div>{item.title}</div>
            <div>
              {isEmpty(item.list)
                ? "저장된 항목 없음"
                : `숙소 ${item.list.length}개`}
            </div>
          </div>
        </a>
      </Link>
    </Container>
  );
};

export default ListCard;
