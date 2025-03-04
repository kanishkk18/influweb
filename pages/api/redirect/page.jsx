'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const role = user.publicMetadata.role;
      if (role === 'creator') {
        router.push('/creator');
      } else if (role === 'brand') {
        router.push('/brand');
      }
    }
  }, [user, router]);

  return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
}