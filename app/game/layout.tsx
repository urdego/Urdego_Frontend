'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import useLoadingStore from '@/stores/loadingStore';

export default function InGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const [loadError, setLoadError] = useState<string | null>(null);

  // useEffect(() => {
  //   setLoading(true);
  // }, []);

  const handleScriptLoad = () => {
    setLoading(false);
  };

  const handleScriptError = () => {
    setLoadError('Google Maps를 로드하는 데 실패했습니다.');
    setLoading(false);
  };

  // const handleScriptLoad = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   setLoading(false);
  // };

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
      <>{children}</>
    </>
  );
}
