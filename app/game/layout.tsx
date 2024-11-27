'use client';

import { useState } from 'react';
import Script from 'next/script';
import { PageWrapper } from './[roomId]/[round]/game.styles';

export default function InGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleScriptLoad = () => {
    setIsMapLoaded(true);
  };

  const handleScriptError = () => {
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
        {/* TODO : 게임 로딩중일때 로딩 스피너 필요(google Map Load) */}
        {isMapLoaded ? children : <div>게임 준비중입니다...</div>}
      </PageWrapper>
    </>
  );
}
