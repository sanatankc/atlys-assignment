import React from 'react';
import { AuthGuardClient } from '@/components/providers/auth-guard-client';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuardClient>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
        <div className="w-full">
          {children}
        </div>
      </div>
    </AuthGuardClient>
  );
}
