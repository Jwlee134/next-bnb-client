import Button from "components/common/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { IoIosArrowBack } from "react-icons/io";
import useValidation from "hooks/useValidation";
import { useSelector } from "store";
import { getCoordinatesAPI } from "lib/api/location";
import { useDispatch } from "react-redux";
import { hostingActions } from "store/hosting";

const Container = styled.div`
  width: 100%;
  height: 88px;
  border-top: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
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

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -12.5px 0 0 -12.5px;
  width: 25px;
  height: 25px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Footer = ({
  nextHref,
  isValid = true,
  isLocation = false,
}: {
  nextHref: string;
  isValid?: boolean;
  isLocation?: boolean;
}) => {
  const router = useRouter();
  const { setValidation } = useValidation();
  const [loading, setLoading] = useState(false);

  const { province, city, streetAddress } = useSelector(
    (state) => state.hosting
  );
  const dispatch = useDispatch();

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isValid) {
      setValidation(true);
      e.preventDefault();
    }
    if (isLocation && province && city && streetAddress) {
      e.preventDefault();
      try {
        setLoading(true);
        const address = province.concat(" ", city, " ", streetAddress);
        const {
          data: { lat, lng },
        } = await getCoordinatesAPI(address);
        dispatch(hostingActions.setLatitude(lat));
        dispatch(hostingActions.setLongitude(lng));
        setLoading(false);
        router.push(nextHref);
      } catch (error) {
        alert(error.response.data);
      }
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
      <Link href={nextHref}>
        <a>
          <Button
            onClick={handleClick}
            style={{
              width: 62,
              backgroundColor: palette.dark_cyan,
              position: "relative",
            }}
          >
            {loading ? <Loader /> : "다음"}
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default Footer;
