import React from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/router";
import palette from "styles/palette";
import { IUser } from "types/user";
import useUser from "hooks/useUser";
import useHamburgetMenu from "hooks/useHamburgetMenu";
import UserMenu from "components/hamburgerMenu/UserMenu";

const Container = styled.div`
  width: 100%;
  height: 64px;
  background-color: white;
  padding: 0px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${palette.gray_eb};
  > div {
    height: 25px;
    svg {
      opacity: 0.7;
    }
  }
`;

const MobileHeader = ({ data }: { data: IUser }) => {
  const { user } = useUser();
  const router = useRouter();
  const { openMenu, closeMenu, HamburgerPortal } = useHamburgetMenu();
  return (
    <>
      <Container>
        <div onClick={() => router.back()}>
          <IoIosArrowBack size={25} />
        </div>
        <div onClick={openMenu}>
          {data._id === user?._id && <GiHamburgerMenu size={25} />}
        </div>
      </Container>
      <HamburgerPortal>
        <UserMenu closeMenu={closeMenu} />
      </HamburgerPortal>
    </>
  );
};

export default MobileHeader;
