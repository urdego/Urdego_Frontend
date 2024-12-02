'use client';

import React, { useEffect, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useLoadingStore from '../../stores/loadingStore';

const RouteChangeHandler: React.FC = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  useEffect(() => {
    setLoading(false);
  }, [pathname, setLoading]);

  return null;
};

export default RouteChangeHandler;
