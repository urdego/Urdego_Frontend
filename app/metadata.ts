import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Urdego?!',
    default: 'Urdego?!',
  },
  description: 'Where am I? Urdego!',
  icons: {
    icon: '/favicon-face(transparent).svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};
