'use client';

import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import UserMarker from '@/styles/Icon/UserMarker.svg';

interface MapContainerProps {
  mode: 'game' | 'rank';
}

const MapContainer = styled.div<MapContainerProps>`
  width: 100%;
  position: relative;

  ${({ mode }) =>
    mode === 'game'
      ? css`
          height: calc(100vh - 235px);
        `
      : css`
          height: 250px;
        `}
`;

interface MapComponentProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  mode: 'game' | 'rank';
  onCoordinateSelect: (coordinate: google.maps.LatLngLiteral | null) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  center = { lat: 36.5, lng: 127.5 },
  zoom = 7,
  mode,
  onCoordinateSelect,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapElementRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // 지도 초기화 함수
  const initializeMap = () => {
    if (!mapElementRef.current) {
      console.error('지도 컨테이너 요소를 찾을 수 없습니다.');
      return;
    }

    if (!mapRef.current) {
      const mapOptions: google.maps.MapOptions = {
        center: mode === 'rank' ? { lat: 37.5665, lng: 126.978 } : center,
        zoom: mode === 'rank' ? 15 : zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
      };

      mapRef.current = new google.maps.Map(mapElementRef.current, mapOptions);

      // 지도 클릭 이벤트 추가
      mapRef.current.addListener(
        'click',
        (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const position = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            };
            handleMarkerPlacement(position);
          }
        }
      );
    }
  };

  // 마커 배치 함수
  const handleMarkerPlacement = (position: google.maps.LatLngLiteral) => {
    // 기존 마커 제거
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // 새 마커 생성
    const marker = new google.maps.Marker({
      position,
      map: mapRef.current!,
      icon: {
        url: UserMarker.src,
        scaledSize: new google.maps.Size(50, 53), // TODO: 사이즈 조절
      },
    });

    markerRef.current = marker;

    // 부모 컴포넌트로 선택된 좌표 전달
    onCoordinateSelect(position);
  };

  useEffect(() => {
    initializeMap();
  }, [center, zoom, mode]);

  return <MapContainer ref={mapElementRef} mode={mode} />;
};

export default MapComponent;
