import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Urdego?!',
    default: 'Urdego?!',
  },
  description: 'Where am I? Urdego!',
  icons: {
    icon: '/favicon.svg',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FFFFFF',
};
