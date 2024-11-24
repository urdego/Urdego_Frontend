'use client';

import { useState } from 'react';
import Script from 'next/script';
import { PageWrapper } from './[round]/game.styles';

export default function InGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleScriptLoad = () => {
    console.log('Google Maps script loaded successfully');
    setIsMapLoaded(true);
  };

  const handleScriptError = () => {
    console.error('Failed to load Google Maps script');
    setLoadError('Google Maps를 로드하는 데 실패했습니다.');
  };

  if (loadError) {
    return <div>Error: {loadError}</div>;
  }

  return (
    <>
      <Script
        id="google-maps-script"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      <PageWrapper>
        {isMapLoaded ? children : <div>Google Maps를 로딩 중입니다...</div>}
      </PageWrapper>
    </>
  );
}
