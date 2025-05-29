'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const therapistId = typeof window !== 'undefined' && localStorage.getItem('therapistId');
    if (therapistId) {
      router.replace('/post-login');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return null;
}
