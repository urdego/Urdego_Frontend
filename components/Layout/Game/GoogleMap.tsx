'use client';

import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

interface MapContainerProps {
  mode: 'game' | 'rank';
}

const MapContainer = styled.div<MapContainerProps>`
  width: 100%;
  position: relative;
  display: block;

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
}

const MapComponent: React.FC<MapComponentProps> = ({
  center = { lat: 36.5, lng: 127.5 },
  zoom = 6,
  mode,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElementRef.current) {
      console.error('지도 컨테이너 요소를 찾을 수 없습니다.');
      return;
    }

    try {
      if (!mapRef.current) {
        console.log('새 지도 인스턴스를 초기화합니다.');
        const mapOptions: google.maps.MapOptions = {
          center: mode === 'rank' ? { lat: 37.5665, lng: 126.978 } : center,
          zoom: mode === 'rank' ? 15 : zoom, // Rank일때는 장소 근처, Game일떄는 한반도
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
          gestureHandling: 'auto',
        };

        mapRef.current = new google.maps.Map(mapElementRef.current, mapOptions);
        console.log('지도 인스턴스가 성공적으로 생성되었습니다.');
      } else {
        console.log('지도 인스턴스가 이미 존재합니다.');
      }
    } catch (error) {
      console.error('지도 생성 중 오류가 발생했습니다:', error);
    }

    return () => {};
  }, [center, zoom]);

  return <MapContainer ref={mapElementRef} mode={mode} />;
};

export default MapComponent;
