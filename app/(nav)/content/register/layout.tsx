'use client';

import { APIProvider } from '@vis.gl/react-google-maps';

export default function ContentRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <APIProvider
      apiKey={
        process.env.NEXT_PUBLIC_LOCATION_REGISTER_GOOGLE_MAPS_API_KEY as string
      }
    >
      {children}
    </APIProvider>
  );
}
