'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import Script from 'next/script';
import React, { useState } from 'react';

export default function PlaceRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <APIProvider
        apiKey={
          process.env
            .NEXT_PUBLIC_LOCATION_REGISTER_GOOGLE_MAPS_API_KEY as string
        }
        onLoad={() => {
          setLoading(true);
        }}
      >
        {loading && <>{children}</>}
      </APIProvider>
    </>
  );
}
