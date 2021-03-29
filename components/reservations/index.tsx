import Header from "components/header";
import useUser from "hooks/useUser";
import { isEmpty } from "lodash";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import Notification from "components/common/Notification";
import { IUser } from "types/user";
import Error from "pages/_error";
import Past from "./Past";
import Upcoming from "./Upcoming";
import MyRoom from "./MyRoom";
import { useRouter } from "next/router";

const Container = styled.div`
  header {
    > div {
      max-width: 1280px;
    }
  }
  .reservations_main {
    padding: 36px 80px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    > div:first-child {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 32px;
    }
    .reservations_button-container {
      border-bottom: 1px solid ${palette.gray_dd};
      margin-bottom: 16px;
    }
  }
`;

const Button = styled.button<{ clicked: boolean }>`
  background-color: white;
  outline: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  border: 0;
  color: ${palette.gray_80};
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: ${palette.gray_f7};
  }
  ${({ clicked }) =>
    clicked &&
    css`
      color: ${palette.black};
      ::after {
        position: absolute;
        content: "";
        background-color: ${palette.black};
        width: 100%;
        height: 1px;
        left: 0;
        bottom: 0;
      }
    `}
`;

const Reservations = () => {
  const router = useRouter();
  const { tab = "upcoming" } = router.query;
  const { user } = useUser("/");
  const [error, setError] = useState<{ code: number | null; message: string }>({
    code: null,
    message: "",
  });

  const [upcomingNotif, setUpcomingNotif] = useState(0);
  const [pastNotif, setPastNotif] = useState(0);
  const [myRoomNotif, setMyRoomNotif] = useState(0);

  const getNotifCount = (keyword: string) =>
    (user as IUser).unreadNotifications.filter((notif) => {
      return notif.label.includes(keyword);
    }).length;

  useEffect(() => {
    if (!user || !user.isLoggedIn) return;
    setUpcomingNotif(getNotifCount("upcoming"));
    setPastNotif(getNotifCount("past"));
    setMyRoomNotif(getNotifCount("myRoom"));
  }, [user]);

  if (error.code) {
    return <Error statusCode={error.code} message={error.message} />;
  }

  return (
    <Container>
      <Head>
        <title>예약 목록 · 에어비앤비</title>
      </Head>
      <Header useSearchBar={false} />
      <div className="reservations_main">
        <div>예약 목록</div>
        <div className="reservations_button-container">
          <Button
            clicked={tab === "upcoming"}
            onClick={() => router.push("/reservations?tab=upcoming")}
            type="button"
          >
            예정된 예약
            {upcomingNotif > 0 && <Notification>{upcomingNotif}</Notification>}
          </Button>
          <Button
            clicked={tab === "past"}
            onClick={() => router.push("/reservations?tab=past")}
            type="button"
          >
            이전 예약
            {pastNotif > 0 && <Notification>{pastNotif}</Notification>}
          </Button>
          {!isEmpty(user?.rooms) && (
            <Button
              clicked={tab === "myRoom"}
              onClick={() => router.push("/reservations?tab=myRoom")}
              type="button"
            >
              내 숙소
              {myRoomNotif > 0 && <Notification>{myRoomNotif}</Notification>}
            </Button>
          )}
        </div>
        {tab === "upcoming" && <Upcoming user={user} setError={setError} />}
        {tab === "past" && <Past user={user} setError={setError} />}
        {tab === "myRoom" && <MyRoom user={user} setError={setError} />}
      </div>
    </Container>
  );
};

export default Reservations;
