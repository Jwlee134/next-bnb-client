import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { hostingActions } from "store/hosting";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div``;

const Map = styled.div`
  width: 100%;
  height: 300px;
  #map {
    width: 100%;
    height: 100%;
    .gm-fullscreen-control,
    .gm-svpc,
    .gm-style-mtc {
      display: none;
    }
  }
`;

declare global {
  interface Window {
    initMap: () => void;
  }
}

const Pin = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { latitude: lat, longitude: lng } = useSelector(
    (state) => state.hosting
  );
  const dispatch = useDispatch();

  const loadMap = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
  };

  window.initMap = () => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
      });
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
      });
      map.addListener("center_changed", () => {
        const lat = map.getCenter().lat();
        const lng = map.getCenter().lng();
        marker.setPosition({ lat, lng });
        dispatch(hostingActions.setLatitude(lat));
        dispatch(hostingActions.setLongitude(lng));
      });
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <>
      <Container>
        <h1>핀이 놓인 위치가 정확한가요?</h1>
        <h3>
          필요한 경우 핀이 정확한 위치에 자리하도록 조정할 수 있어요. 도착 시
          숙소를 찾을 수 있도록 예약이 확정된 게스트만 핀을 볼 수 있습니다.
        </h3>
        <Map>
          <div ref={mapRef} id="map" />
        </Map>
      </Container>
      <Footer nextHref="/become-a-host/amenities" />
    </>
  );
};

export default Pin;
