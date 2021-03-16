import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import querystring from "querystring";
import { searchActions } from "store/search";
import styled from "styled-components";
import { extractCustomQuery } from "utils";
import { isEmpty } from "lodash";

const Container = styled.div`
  width: 45vw;
  height: calc(100vh - 80px);
  position: sticky;
  top: 80px;
  > div {
    width: 100%;
    height: 100%;
    .gm-fullscreen-control,
    .gm-svpc,
    .gm-style-mtc {
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

declare global {
  interface Window {
    initMap: () => void;
  }
}

const SearchMap = () => {
  const searchResults = useSelector((state) => state.room.search.searchResults);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const [map, setMap] = useState<google.maps.Map<HTMLDivElement> | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  const mapRef = useRef<HTMLDivElement>(null);

  const lat = Number(query.latitude);
  const lng = Number(query.longitude);

  window.initMap = () => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 14,
        gestureHandling: "greedy",
      });
      setMap(map);
      map.addListener("dragend", () => {
        const latitude = map.getCenter().lat();
        const longitude = map.getCenter().lng();
        router.push(
          `/search/rooms?${querystring.stringify({
            ...search,
            latitude,
            longitude,
            value: "지도에서 선택한 지역",
          })}${extractCustomQuery(query)}`
        );
        dispatch(searchActions.setValue("지도에서 선택한 지역"));
      });
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!map) return;
    if (!isEmpty(markers)) {
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);
    }
    const arr: google.maps.Marker[] = [];
    searchResults.forEach((room) => {
      const marker = new google.maps.Marker({
        position: { lat: room.latitude, lng: room.longitude },
        map,
      });
      arr.push(marker);
    });
    setMarkers(arr);
  }, [map, searchResults]);

  useEffect(() => {
    if (!map) return;
    map.setCenter({ lat, lng });
  }, [map, lat, lng]);

  return (
    <Container>
      <div ref={mapRef} />
    </Container>
  );
};

export default SearchMap;
