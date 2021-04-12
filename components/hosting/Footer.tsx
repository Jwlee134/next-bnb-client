import Button from "components/common/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import useValidation from "hooks/useValidation";
import { useSelector } from "store";
import { getCoordinatesAPI } from "lib/api/location";
import { useDispatch } from "react-redux";
import { hostingActions } from "store/hosting";
import { registerRoomAPI, updateRoomAPI } from "lib/api/room";
import Loader from "components/common/Loader";
import { commonActions } from "store/common";

const Container = styled.div`
  width: 100%;
  height: 88px;
  border-top: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  @media ${({ theme }) => theme.device.tabletSmall} {
    padding: 0;
  }
`;

const GoBack = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
    margin-bottom: 0.5px;
  }
  span {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = ({
  nextHref,
  isValid = true,
  isLocation = false,
  isSubmit = false,
}: {
  nextHref?: string;
  isValid?: boolean;
  isLocation?: boolean;
  isSubmit?: boolean;
}) => {
  const router = useRouter();
  const { setValidation } = useValidation();
  const [loading, setLoading] = useState(false);

  const hosting = useSelector((state) => state.hosting);
  const hostingMode = useSelector((state) => state.common.hostingMode);
  const clickedRoomId = useSelector((state) => state.common.clickedRoomId);
  const dispatch = useDispatch();

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isValid) {
      setValidation(true);
      e.preventDefault();
    }
    if (
      isLocation &&
      hosting.province &&
      hosting.city &&
      hosting.streetAddress
    ) {
      e.preventDefault();
      try {
        setLoading(true);
        const address = `${hosting.province} ${hosting.city} ${hosting.streetAddress}`;
        const {
          data: { lat, lng },
        } = await getCoordinatesAPI(address);
        dispatch(hostingActions.setLatitude(lat));
        dispatch(hostingActions.setLongitude(lng));
        setLoading(false);
        router.push(nextHref as string);
      } catch (error) {
        alert(error.response.data);
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    if (hostingMode === "update") {
      try {
        await updateRoomAPI(hosting, clickedRoomId);
        router.push("/management?sortBy=updatedAt&order=desc");
        dispatch(hostingActions.initState());
        dispatch(commonActions.setHostingMode("register"));
      } catch (error) {
        alert(error.response.data);
      }
      return;
    }
    try {
      const { data } = await registerRoomAPI(hosting);
      router.push(`/room/${data._id}?adults=1&children=0&infants=0`);
      dispatch(hostingActions.initState());
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    return () => {
      setValidation(false);
    };
  }, []);

  return (
    <Container>
      <GoBack onClick={() => router.back()}>
        <IoIosArrowBack size={20} />
        <span>뒤로</span>
      </GoBack>
      {nextHref && (
        <Link href={nextHref}>
          <a>
            <Button
              backgroundColor="darkcyan"
              onClick={handleClick}
              style={{
                width: 62,
                position: "relative",
              }}
            >
              {loading ? <Loader /> : "다음"}
            </Button>
          </a>
        </Link>
      )}
      {isSubmit && (
        <Button
          backgroundColor="darkcyan"
          onClick={handleSubmit}
          style={{
            width: 100,
            position: "relative",
          }}
        >
          {hostingMode === "update" ? "수정하기" : "등록하기"}
        </Button>
      )}
    </Container>
  );
};

export default Footer;
