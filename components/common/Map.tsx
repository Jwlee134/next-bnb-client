import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { searchActions } from "store/search";
import styled from "styled-components";
import { makeQueryString } from "utils";
import { isEmpty } from "lodash";
import { roomActions } from "store/room";
import { MdRefresh } from "react-icons/md";
import Loader from "components/common/Loader";
import { render } from "react-dom";
import { IRoom } from "types/room";
import InfoWindow from "../room/search/InfoWindow";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  position: sticky;
  top: 80px;
  > div {
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
`;

const Label = styled.label`
  min-width: 133px;
  position: absolute;
  top: 0;
  width: fit-content;
  height: 40px;
  background-color: white;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: Noto Sans KR;
  padding: 0px 12px;
  cursor: pointer;
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
`;

declare global {
  interface Window {
    initMap: () => void;
  }
}

interface Props {
  roomList: IRoom[];
  useMoveToSearch?: boolean;
  useFitBounds?: boolean;
}

const Map = ({
  roomList,
  useMoveToSearch = false,
  useFitBounds = false,
}: Props) => {
  const hoveredItemIndex = useSelector(
    (state) => state.room.search.hoveredItemIndex
  );
  const isLoading = useSelector((state) => state.room.isLoading);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const [map, setMap] = useState<google.maps.Map<HTMLDivElement> | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [searchWithMoving, setSearchWithMoving] = useState(true);
  const [isMoved, setIsMoved] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const lat = Number(query.latitude) || 0;
  const lng = Number(query.longitude) || 0;
  const zoom = Number(query.zoom) || 2;

  // 지도 로드 직후 콜백함수
  window.initMap = () => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: zoom || 14,
        gestureHandling: "greedy",
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
  }, [map, markers]);

  const getNewResults = (map: google.maps.Map<HTMLDivElement>) => {
    const coordsBounds = (
      ((map.getBounds() as google.maps.LatLngBounds).getNorthEast().lat() -
        map.getCenter().lat()) /
      1.2
    ).toString();
    const latitude = map.getCenter().lat();
    const longitude = map.getCenter().lng();
    const zoom = map.getZoom().toString();
    dispatch(roomActions.setIsLoading(true));
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
  };

  useEffect(() => {
    if (!map) return;
    map.setCenter({ lat, lng });
    map.setZoom(zoom);
  }, [map, lat, lng, zoom]);

  useEffect(() => {
    if (!map) return;
    if (!useMoveToSearch) return;
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
  }, [map, searchWithMoving, query]);

  const createInfoWindow = (
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
        <InfoWindow search={search} room={room} />,
        document.getElementById("infoWindow")
      );
    });
    info.open(map);
    setInfoWindow(info);
  };

  useEffect(() => {
    if (!map) return;
    const eventArr: google.maps.MapsEventListener[] = [];
    if (!isEmpty(markers)) {
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
  }, [map, markers, infoWindow]);

  useEffect(() => {
    if (!map) return;
    // 마커가 있다면 이전 마커들 삭제
    if (!isEmpty(markers)) {
      markers.forEach((marker) => marker.setMap(null));
    }
    setMarkers([]);
    // 새로운 마커 추가
    const arr: google.maps.Marker[] = [];
    roomList.forEach((room) => {
      const marker = new google.maps.Marker({
        position: { lat: room.latitude, lng: room.longitude },
        map,
      });
      arr.push(marker);
    });
    setMarkers(arr);
  }, [map, roomList]);

  // Room card hover 시 마커에 애니메이션 부여
  useEffect(() => {
    const marker = markers.find((_, index) => index === hoveredItemIndex);
    marker?.setAnimation(google.maps.Animation.BOUNCE);
    return () => {
      marker?.setAnimation(null);
    };
  }, [hoveredItemIndex]);

  const handleClick = () => {
    if (!isMoved) return;
    getNewResults(map as google.maps.Map<HTMLDivElement>);
    setIsMoved(false);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchWithMoving(e.target.checked);

  return (
    <Container>
      <div ref={mapRef} />
      {useMoveToSearch && (
        <Label onClick={handleClick}>
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
              <div>{isMoved ? "이 지역 검색" : "지도를 움직이며 검색하기"}</div>
            </>
          )}
        </Label>
      )}
    </Container>
  );
};

export default Map;
