'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 235px);
  position: relative;
  display: block;
`;

interface MapComponentProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
  center = { lat: 36.5, lng: 127.5 },
  zoom = 6,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElementRef.current) {
      console.error('Map container element not found');
      return;
    }

    try {
      if (!mapRef.current) {
        console.log('Initializing new map instance');
        const mapOptions: google.maps.MapOptions = {
          center,
          zoom,
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
        console.log('Map instance created successfully');
      } else {
        console.log('Map instance already exists');
      }
    } catch (error) {
      console.error('Error creating map:', error);
    }

    return () => {
      // Cleanup function if needed
    };
  }, [center, zoom]);

  return <MapContainer ref={mapElementRef} />;
};

export default MapComponent;
