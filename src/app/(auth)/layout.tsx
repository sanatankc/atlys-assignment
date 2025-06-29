import React from 'react';
import { AuthGuard } from '@/components/providers/auth-guard';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="w-full">
        {children}
      </div>
    </div>
    </AuthGuard>
  );
}
