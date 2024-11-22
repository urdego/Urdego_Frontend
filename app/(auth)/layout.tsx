'use client';

import React from 'react';
import { LayoutWrapper } from '@/app/(auth)/layout.styles';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default AuthLayout;
