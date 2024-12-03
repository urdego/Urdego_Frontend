import Script from 'next/script';
import React from 'react';

export default function PlaceRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="google-maps-script"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_LOCATION_REGISTER_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`}
      />
      <>{children}</>
    </>
  );
}
