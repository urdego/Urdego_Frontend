'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import useLoadingStore from '@/stores/loadingStore';
import LoadingSpinnerComponent from '@/components/Common/LoadingSpinner/LoadingSpinner';

export default function InGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleScriptLoad = () => {
    setIsMapLoaded(true);
    setLoading(false); // 지도 로딩 완료 시 로딩 상태 해제
  };

  const handleScriptError = () => {
    setLoadError('Google Maps를 로드하는 데 실패했습니다.');
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true); // 초기 로딩 상태 설정
  }, [setLoading]);

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
      <>{isMapLoaded ? children : <LoadingSpinnerComponent />}</>
    </>
  );
}
