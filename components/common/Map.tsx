import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { searchActions } from "store/search";
import styled, { css } from "styled-components";
import { makeQueryString } from "utils";
import { isEmpty } from "lodash";
import { MdRefresh } from "react-icons/md";
import Loader from "components/common/Loader";
import { render } from "react-dom";
import { IRoom } from "types/room";
import { commonActions } from "store/common";
import { IoCloseSharp, IoFilter } from "react-icons/io5";
import useModal from "hooks/useModal";
import FilterModal from "components/modal/filterModal";
import { persistActions } from "store/persist";
import InfoWindow from "../room/search/map/InfoWindow";

const Container = styled.div<{ pathname: string }>`
  width: 100%;
  height: calc(100vh - 80px);
  position: sticky;
  top: 80px;
  > div:first-child {
    width: 100%;
    height: 100%;
    .gm-fullscreen-control,
    .gm-svpc,
    .gm-style-mtc,
    .gm-ui-hover-effect {
      display: none !important;
    }
    .gm-style-iw-c,
    .gm-style-iw-d {
      padding: 0 !important;
      overflow: hidden !important;
    }
    .gm-style-iw-t {
      bottom: 55px !important;
    }
    .gm-style-iw-t::after {
      display: none;
    }
    .gm-bundled-control {
      top: 0;
      .gmnoprint {
        top: 10px !important;
        left: -10px !important;
        > div {
          border-radius: 8px !important;
        }
      }
    }
  }
  .map_button {
    height: 40px;
    position: absolute;
    background-color: white;
    top: 0;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: Noto Sans KR;
  }
  .map_fullscreen-button {
    display: none;
    width: 40px;
    svg {
      color: #595959;
    }
  }
  .map_filter-button {
    right: 20px;
  }
  .map_close-button {
    left: 20px;
  }
  .map_move-to-search_toggle {
    min-width: 133px;
    width: fit-content;
    padding: 0px 12px;
    left: 50% !important;
    transform: translate(-50%) !important;
    input {
      width: 16px;
      height: 16px;
      margin: 0;
      margin-right: 10px;
    }
    svg {
      margin-right: 6px;
    }
    div {
      margin-bottom: 2px;
    }
  }
  @media ${({ theme }) => theme.device.pcSmall} {
    .map_close-button,
    .map_filter-button {
      display: flex;
    }
    > div:first-child {
      .gm-bundled-control {
        .gmnoprint {
          top: 70px !important;
        }
      }
    }
  }
  @media ${({ theme }) => theme.device.tabletSmall} {
    height: calc(100vh - 64px);
  }
  ${({ pathname }) =>
    pathname !== "/search/rooms" &&
    css`
      > div:first-child {
        .gm-bundled-control {
          .gmnoprint {
            top: 10px !important;
            @media ${({ theme }) => theme.device.tabletSmall} {
              display: none;
            }
          }
        }
      }
    `}
`;

declare global {
  interface Window {
    initMap: () => void;
  }
}

interface Props {
  roomList?: IRoom[];
  room?: IRoom;
  useMoveToSearch?: boolean;
  useFitBounds?: boolean;
  useInteractiveMarker?: boolean;
  gestureHandling?: "greedy" | "auto";
}

const Map = ({
  roomList,
  room,
  useMoveToSearch = false,
  useFitBounds = false,
  useInteractiveMarker = true,
  gestureHandling = "greedy",
}: Props) => {
  const hoveredItemIndex = useSelector(
    (state) => state.room.search.hoveredItemIndex
  );
  const isLoading = useSelector((state) => state.common.isLoading);
  const search = useSelector((state) => state.search);
  const innerWidth = useSelector((state) => state.common.innerWidth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { query, pathname } = router;

  const { openModal, closeModal, ModalPortal } = useModal();

  const [map, setMap] = useState<google.maps.Map<HTMLDivElement> | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [searchWithMoving, setSearchWithMoving] = useState(true);
  const [isMoved, setIsMoved] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const lat = Number(query.latitude) || room?.latitude || 0;
  const lng = Number(query.longitude) || room?.longitude || 0;
  const zoom = Number(query.zoom) || 2;

  // 지도 로드 직후 콜백함수
  window.initMap = () => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: zoom || 14,
        gestureHandling,
        maxZoom: 17,
      });
      setMap(map);
    }
  };

  // 최초 지도 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // FitBounds 이벤트 함수
  useEffect(() => {
    if (!map || !markers || !useFitBounds) return;
    const coordinates: google.maps.LatLng[] = [];
    if (isEmpty(markers)) return;
    markers.forEach((marker) => {
      const lat = marker.getPosition()?.lat();
      const lng = marker.getPosition()?.lng();
      if (lat && lng) {
        const coordinate = new google.maps.LatLng(lat, lng);
        coordinates.push(coordinate);
      }
    });
    const bounds = new google.maps.LatLngBounds();
    coordinates.forEach((coordinate) => bounds.extend(coordinate));
    map.fitBounds(bounds, 100);
  }, [map, markers, useFitBounds]);

  // 지도 움직임 이벤트 후 데이터 가져오는 함수
  const getNewResults = useCallback(
    (map: google.maps.Map<HTMLDivElement>) => {
      const coordsBounds = (
        ((map.getBounds() as google.maps.LatLngBounds).getNorthEast().lat() -
          map.getCenter().lat()) /
        1.2
      ).toString();
      const latitude = map.getCenter().lat();
      const longitude = map.getCenter().lng();
      const zoom = map.getZoom().toString();
      dispatch(commonActions.setIsLoading(true));
      router.push(
        `/search/rooms${makeQueryString({
          ...query,
          latitude,
          longitude,
          value: "지도에서 선택한 지역",
          page: "1",
          zoom,
          coordsBounds,
        })}`
      );
      dispatch(searchActions.setValue("지도에서 선택한 지역"));
      dispatch(searchActions.setLatitude(latitude));
      dispatch(searchActions.setLongitude(longitude));
    },
    [dispatch, query, router]
  );

  useEffect(() => {
    if (!map) return;
    map.setCenter({ lat, lng });
    map.setZoom(zoom);
  }, [map, lat, lng, zoom]);

  // 지도를 움직이며 검색 이벤트 함수
  useEffect(() => {
    if (!map || !useMoveToSearch) return;
    const dragEnd = map.addListener("dragend", () => {
      if (searchWithMoving) {
        getNewResults(map);
      } else {
        setIsMoved(true);
      }
    });
    const zoomChanged = map.addListener("zoom_changed", () => {
      if (searchWithMoving) {
        getNewResults(map);
      } else {
        setIsMoved(true);
      }
    });
    return () => {
      dragEnd.remove();
      zoomChanged.remove();
    };
  }, [map, searchWithMoving, query, getNewResults, useMoveToSearch]);

  // 인포윈도우 생성 함수
  const createInfoWindow = useCallback(
    (
      e: google.maps.MapMouseEvent,
      map: google.maps.Map<HTMLDivElement>,
      room: IRoom
    ) => {
      const info = new google.maps.InfoWindow({
        content: "<div id='infoWindow' />",
        position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
      });
      info.addListener("domready", () => {
        render(
          <InfoWindow
            search={search}
            room={room}
            innerWidth={innerWidth}
            router={router}
          />,
          document.getElementById("infoWindow")
        );
      });
      info.open(map);
      setInfoWindow(info);
    },
    [innerWidth, router, search]
  );

  useEffect(() => {
    if (!map || !useInteractiveMarker) return;
    const eventArr: google.maps.MapsEventListener[] = [];
    if (!isEmpty(markers) && roomList) {
      markers.forEach((marker, i) => {
        const event = marker.addListener("click", (e) => {
          // 이전 인포윈도우 삭제
          if (infoWindow) {
            infoWindow.close();
            setInfoWindow(null);
          }
          // 같은 마커를 한번 더 클릭해도 다시 인포윈도우를 생성하지 않음
          if (e.latLng.lat() !== infoWindow?.getPosition().lat()) {
            createInfoWindow(e, map, roomList[i]);
          }
        });
        eventArr.push(event);
      });
    }
    const clickMapToClose = map.addListener("click", () => {
      if (infoWindow) infoWindow.close();
    });
    // 함수 재실행되기 전마다 이벤트 삭제하여 이벤트 중첩 방지
    return () => {
      eventArr.forEach((event) => {
        event.remove();
      });
      clickMapToClose.remove();
    };
  }, [
    map,
    useInteractiveMarker,
    markers,
    infoWindow,
    createInfoWindow,
    roomList,
  ]);

  useEffect(() => {
    if (!map) return;
    // 마커가 있다면 이전 마커들 삭제
    if (!isEmpty(markers)) {
      markers.forEach((marker) => marker.setMap(null));
    }
    setMarkers([]);
    // 새로운 마커 추가
    const arr: google.maps.Marker[] = [];
    if (roomList) {
      roomList.forEach((room) => {
        const marker = new google.maps.Marker({
          position: { lat: room.latitude, lng: room.longitude },
          map,
        });
        arr.push(marker);
      });
    }
    if (room) {
      const marker = new google.maps.Marker({
        position: { lat: room.latitude, lng: room.longitude },
        map,
      });
      arr.push(marker);
    }
    setMarkers(arr);
  }, [map, roomList, room]);

  // Room card hover 시 마커에 애니메이션 부여
  useEffect(() => {
    const marker = markers.find((_, index) => index === hoveredItemIndex);
    marker?.setAnimation(google.maps.Animation.BOUNCE);
    return () => {
      marker?.setAnimation(null);
    };
  }, [hoveredItemIndex, markers]);

  // 이 지역 검색 버튼 클릭 이벤트
  const handleClick = () => {
    if (!isMoved) return;
    getNewResults(map as google.maps.Map<HTMLDivElement>);
    setIsMoved(false);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchWithMoving(e.target.checked);

  return (
    <>
      <Container pathname={pathname} className="map">
        <div ref={mapRef} />
        {pathname === "/search/rooms" && (
          <>
            <div
              className="map_close-button map_button map_fullscreen-button"
              onClick={() => dispatch(persistActions.setShowMap(false))}
            >
              <IoCloseSharp size={30} />
            </div>
            <div
              className="map_filter-button map_button map_fullscreen-button"
              onClick={openModal}
            >
              <IoFilter size={26} />
            </div>
          </>
        )}
        {useMoveToSearch && (
          <label
            className="map_move-to-search_toggle map_button"
            onClick={handleClick}
          >
            {isLoading && <Loader whiteBackground />}
            {!isLoading && (
              <>
                {!isMoved && (
                  <input
                    type="checkbox"
                    checked={searchWithMoving}
                    onChange={handleCheckbox}
                  />
                )}
                {isMoved && <MdRefresh size={20} />}
                <div>{isMoved ? "이 지역 검색" : "지도를 움직이며 검색"}</div>
              </>
            )}
          </label>
        )}
      </Container>
      <ModalPortal>
        <FilterModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default React.memo(Map);
