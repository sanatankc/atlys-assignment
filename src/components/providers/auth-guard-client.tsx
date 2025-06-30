'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

interface AuthGuardClientProps {
  children: React.ReactNode;
}

export function AuthGuardClient({ children }: AuthGuardClientProps) {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [isChecking, setIsChecking] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Immediately check localStorage for auth state to minimize flash
    const checkAuthState = () => {
      try {
        const stored = localStorage.getItem('auth-storage');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.state?.user) {
            // User is authenticated, redirect immediately
            router.push('/');
            return;
          }
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      }
      
      // No user found, safe to render auth pages
      setShouldRender(true);
      setIsChecking(false);
    };

    checkAuthState();
  }, [router]);

  useEffect(() => {
    // Also listen to store changes
    if (user && !isChecking) {
      router.push('/');
    }
  }, [user, router, isChecking]);

  // Show nothing while checking to prevent flash
  if (isChecking || user) {
    return null;
  }

  // Only render children if we're sure user is not authenticated
  return shouldRender ? <>{children}</> : null;
} 